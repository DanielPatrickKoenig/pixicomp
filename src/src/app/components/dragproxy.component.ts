import {Component, Input, Output, EventEmitter} from '@angular/core';
import PixiManager from '../objects/PixiManager';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
import Trig from '../objects/Trig';
@Component({
  selector: 'drag-proxy',
  template: `
    <div class="drag-proxy" [ngStyle]="getOuterMoverStyle()" (mousedown)="onMoverDown($event)">
      <div class="drag-proxy" [ngStyle]="getInnerMoverStyle()">
      </div>
    </div>
    <div class="drag-proxy-control" [ngStyle]="getRotatorStyle()" (mousedown)="onRotatorDown($event)"></div>
    <div class="drag-proxy-control" *ngIf="hasHeightAndWidth()" [ngStyle]="getSizerStyle()" (mousedown)="onSizerDown($event)"></div>
    <div class="drag-proxy-overlay" *ngIf="dragging" (mouseup)="onDragEnd($event)" (mousemove)="onDragMove($event)"></div>
  `
})
export class DragProxy extends BaseEmitterComponent{
  @Input() item: any;
  @Input() pm: PixiManager;
  handleSize: number = 10;
  dragging: boolean = false;
  dragOffset: any = {x:0,y:0};
  DragModes: any = {
    NONE: 0,
    MOVE: 1,
    SIZE: 2,
    ROTATE: 3
  }
  trig:Trig = new Trig();
  dragMode: number = 0;
  intersections: Array<{x:number,y:number}> = [{x:0,y:0},{x:0,y:0}];
  getDefauts():any {
    return {
      x: this.valueOrZero('x'),
      y: this.valueOrZero('y'),
      width: this.valueOrZero('width'),
      height: this.valueOrZero('height'),
      r: this.valueOrZero('r'),
      rotation: this.valueOrZero('rotation')
    };
  }
  getOuterMoverStyle(){
    var styleData: any = {}
    var properties: any = this.getDefauts();
    switch(this.item.type){
      case this.pm.DisplayTypes.Image:{
        // styleData = {'left':properties.x.toString()+'px', 'top':properties.y.toString()+'px','width':properties.width.toString()+'px', 'height':properties.height.toString()+'px', 'background-color':'transparent', 'box-shadow':'0 0 0 1px #000000 inset'};
        styleData = {'transform':'rotate('+this.trig.radiansToDegrees(properties.rotation).toString()+'deg)','left':properties.x.toString()+'px', 'top':properties.y.toString()+'px','width':'0px', 'height':'0px'};
        break;
      }
      case this.pm.DisplayTypes.Sprite:{
        styleData = {'left':(properties.x-(this.handleSize/2)).toString()+'px', 'top':(properties.y-(this.handleSize/2)).toString()+'px','width':'0px', 'height':'0px'};
        break;
      }
    }
    return styleData;
  }
  getInnerMoverStyle(){
    var styleData: any = {}
    var properties: any = this.getDefauts();
    switch(this.item.type){
      case this.pm.DisplayTypes.Image:{
        // styleData = {'left':properties.x.toString()+'px', 'top':properties.y.toString()+'px','width':properties.width.toString()+'px', 'height':properties.height.toString()+'px', 'background-color':'transparent', 'box-shadow':'0 0 0 1px #000000 inset'};
        styleData = {'width':properties.width.toString()+'px', 'height':properties.height.toString()+'px', 'background-color':'transparent', 'box-shadow':'0 0 0 1px #000000 inset'};
        break;
      }
      case this.pm.DisplayTypes.Sprite:{
        styleData = {'width':this.handleSize.toString()+'px', 'height':this.handleSize.toString()+'px', 'background-color':'#000000', 'border-radius':this.handleSize.toString()+'px'};
        break;
      }
    }
    return styleData;
  }
  getSizerStyle(){
    var properties: any = this.getDefauts();
    var tr:any = {
      x: this.trig.orbit(properties.x,properties.width,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.COS),
      y: this.trig.orbit(properties.y,properties.width,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.SIN)
    };
    var br:any = {
      x: this.trig.orbit(tr.x-(this.handleSize/2),properties.height,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.COS),
      y: this.trig.orbit(tr.y-(this.handleSize/2),properties.height,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.SIN)
    };
    return {'left':br.x.toString()+'px', 'top':br.y.toString()+'px', 'width':this.handleSize.toString()+'px', 'height':this.handleSize.toString()+'px'};

    // return {'left':(Number(properties.x)+Number(properties.width)-(this.handleSize/2)).toString()+'px', 'top':(Number(properties.y)+Number(properties.height)-(this.handleSize/2)).toString()+'px', 'width':this.handleSize.toString()+'px', 'height':this.handleSize.toString()+'px'}
  }
  getRotatorStyle(){
    var rotatorRadius = 20;
    var properties: any = this.getDefauts();
    var xVal = this.trig.orbit(properties.x-(this.handleSize/2),rotatorRadius,this.trig.radiansToDegrees(properties.rotation)-90,this.trig.OrbitType.COS);
    var yVal = this.trig.orbit(properties.y-(this.handleSize/2),rotatorRadius,this.trig.radiansToDegrees(properties.rotation)-90,this.trig.OrbitType.SIN);
    return {'left':xVal.toString()+'px', 'top':yVal.toString()+'px', 'width':this.handleSize.toString()+'px', 'height':this.handleSize.toString()+'px'}
  }
  valueOrZero(property){
    return this.item[property] != null && this.item[property] != undefined ? this.item[property] : 0;
  }
  hasHeightAndWidth(){
    return this.item.type == this.pm.DisplayTypes.Image;
  }
  onSizerDown(e){
    var properties: any = this.getDefauts();
    this.dragging = true;
    this.dragMode = this.DragModes.SIZE;
    this.dragOffset = {x: e.pageX-properties.x, y: e.pageY-properties.y, width: properties.width, height: properties.height};
  }
  onMoverDown(e){
    var properties: any = this.getDefauts();
    this.dragging = true;
    this.dragMode = this.DragModes.MOVE;
    this.dragOffset = {x: e.pageX-properties.x, y: e.pageY-properties.y, width: properties.width, height: properties.height};
    // console.log(this.dragOffset);
  }
  onRotatorDown(e){
    var properties: any = this.getDefauts();
    this.dragging = true;
    this.dragMode = this.DragModes.ROTATE;
  }
  onDragEnd(e){
    this.dragging = false;
    this.dragMode = this.DragModes.NONE;

  }
  onDragMove(e){
    var properties: any = this.getDefauts();
    switch(this.dragMode) {
      case this.DragModes.MOVE:
      {
        this.item.x = e.pageX - this.dragOffset.x;
        this.item.y = e.pageY - this.dragOffset.y;
        break;
      }
      case this.DragModes.SIZE:
      {
        // get intersection of extention from mouse to above and top right to over, get intersection of extention from mouse to far left and bottom left to below
        // use intersection points to deturmine width and height.

        // var tl:any = {x: e.pageX - this.dragOffset.x + Number(additionalDist.x), y:e.pageY - this.dragOffset.y};
        // var tr:any = {
        //   x: this.trig.orbit(tl.x,properties.width,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.COS),
        //   y: this.trig.orbit(tl.y,properties.width,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.SIN)
        // };
        // var br:any = {
        //   x: this.trig.orbit(tr.x,properties.height,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.COS),
        //   y: this.trig.orbit(tr.y,properties.height,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.SIN)
        // };
        // var bl:any = {
        //   x: this.trig.orbit(tl.x,properties.height,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.COS),
        //   y: this.trig.orbit(tl.y,properties.height,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.SIN)
        // };
        // this.item.width = this.trig.distance({x: properties.x, y: properties.y}, intersection1);
        // this.item.height = this.trig.distance({x: properties.x, y: properties.y}, intersection2);

        var intersoctorDist = 10000;
        var additionalDist = {
          x: this.trig.orbit(0,this.dragOffset.width,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.COS),
          y: this.trig.orbit(0,this.dragOffset.height,this.trig.radiansToDegrees(properties.rotation)+Number(90),this.trig.OrbitType.SIN)
        }
        // console.log(additionalDist);
        // var tl1:any = {x: e.pageX - this.dragOffset.x + Number(additionalDist.x), y:e.pageY - this.dragOffset.y};
        var tl1:any = {x: e.pageX - this.dragOffset.x, y:e.pageY - this.dragOffset.y};

        var br1:any = {
          x: this.trig.orbit(tl1.x,intersoctorDist,this.trig.radiansToDegrees(properties.rotation)-90,this.trig.OrbitType.COS),
          y: this.trig.orbit(tl1.y,intersoctorDist,this.trig.radiansToDegrees(properties.rotation)-90,this.trig.OrbitType.SIN)
        };
        var tr1:any = {x: properties.x, y: properties.y};
        var bl1:any = {
          x: this.trig.orbit(tr1.x,intersoctorDist,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.COS),
          y: this.trig.orbit(tr1.y,intersoctorDist,this.trig.radiansToDegrees(properties.rotation),this.trig.OrbitType.SIN)
        };
        var intersection1 = this.trig.intersection(tr1,br1,bl1,tl1);
        var tl2:any = {x: e.pageX - this.dragOffset.x, y:e.pageY - this.dragOffset.y};
        // var tl2:any = {x: e.pageX - this.dragOffset.x, y:e.pageY - this.dragOffset.y + Number(additionalDist.y)};
        var br2:any = {
          x: this.trig.orbit(tl2.x,intersoctorDist,this.trig.radiansToDegrees(properties.rotation)+180,this.trig.OrbitType.COS),
          y: this.trig.orbit(tl2.y,intersoctorDist,this.trig.radiansToDegrees(properties.rotation)+180,this.trig.OrbitType.SIN)
        };
        var tr2:any = {x: properties.x, y: properties.y};
        var bl2:any = {
          x: this.trig.orbit(tr2.x,intersoctorDist,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.COS),
          y: this.trig.orbit(tr2.y,intersoctorDist,this.trig.radiansToDegrees(properties.rotation)+90,this.trig.OrbitType.SIN)
        };
        var intersection2 = this.trig.intersection(tr2,br2,bl2,tl2);
        var ratios = {
          x: this.trig.distance(intersection1,{x: properties.x, y: properties.y})/this.dragOffset.width,
          y: this.trig.distance(intersection2,{x: properties.x, y: properties.y})/this.dragOffset.height
        };
        var refactoredIntersection = {
          x: this.trig.orbit(properties.x, this.trig.distance({x:properties.x,y:properties.y},intersection1), this.trig.angle({x:properties.x,y:properties.y},intersection1)-(this.trig.radiansToDegrees(properties.rotation))-90, this.trig.OrbitType.COS),
          y: this.trig.orbit(properties.y, this.trig.distance({x:properties.x,y:properties.y},intersection2), this.trig.angle({x:properties.x,y:properties.y},intersection2)-(this.trig.radiansToDegrees(properties.rotation))-90, this.trig.OrbitType.SIN)
        };
        // var xSizingFactor = intersection1.x >= properties.x ? 1 : -1;
        // var ySizingFactor = intersection2.y >= properties.y ? 1 : -1;
        var xSizingFactor = refactoredIntersection.x >= properties.x ? 1 : -1;
        var ySizingFactor = refactoredIntersection.y >= properties.y ? 1 : -1;
        this.item.width = Number(this.dragOffset.width*ratios.x*xSizingFactor)+Number(this.dragOffset.width);
        this.item.height = Number(this.dragOffset.height*ratios.y*ySizingFactor)+Number(this.dragOffset.height);
        // this.item.width = Number(this.dragOffset.width*ratios.x)+Number(this.dragOffset.width);
        // this.item.height = Number(this.dragOffset.height*ratios.y)+Number(this.dragOffset.height);
        // this.item.width = this.trig.distance({x: properties.x, y: properties.y}, intersection1);
        // this.item.height = this.trig.distance({x: properties.x, y: properties.y}, intersection2);



        this.intersections[0] = intersection1;
        this.intersections[1] = intersection2;


        console.log('0( x : ' + this.intersections[0].x.toString() + ' | ' + 'y : ' + this.intersections[0].y.toString() + ')');
        console.log('1( x : ' + this.intersections[1].x.toString() + ' | ' + 'y : ' + this.intersections[1].y.toString() + ')');

        // this.item.width = (e.pageX - this.dragOffset.x) + (this.dragOffset.width - properties.x);
        // this.item.height = (e.pageY - this.dragOffset.y) + (this.dragOffset.height - properties.y);
        break;
      }
      case this.DragModes.ROTATE:
      {
        var pos:any = {x: e.pageX, y: e.pageY};
        var angle:number = this.trig.angle({x:properties.x,y:properties.y},pos);
        this.item.rotation = this.trig.degreesToRadians(angle);
        break;
      }
    }
    this.onValueUpdated();
  }
}
