import {Component, Input, Output, EventEmitter} from '@angular/core';
import PixiManager from '../objects/PixiManager';
import {DisplayTreeList} from './displaytreelist.component';
import {TweenList} from './tweenlist.component';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
import {AddItem} from './additem.component';
import Trig from '../objects/Trig';
// import DisplayTeir from '../objects/DisplayTeir';
@Component({
  selector: 'display-tree-item',
  template: `<div [class]="getDragClass()">
    <ul>
      <li>
        <a class="reorder-handle" (mousedown)="onHandleDown($event)">
        </a>
        <div class="reorder-overlay" *ngIf="reordering" (mousemove)="onHandleMove($event)" (mouseup)="onHandleUp($event)"></div>
      </li>
      <li>
        <span>Scope</span>
        <input type='checkbox' [(ngModel)]='teir.isMainScope' name='ismainscope' (click)="onValueUpdated();">
      </li>
      <li>
        {{teir.type}}
      </li>
      <li *ngIf="hasSource(teir.type)">
        <span>Source</span>
        <input type="text" [value]="teir.src" (input)="teir.src = $event.target.value; onValueUpdated();"/>
      </li>
      <li *ngIf="hasText(teir.type)">
        <span>Text</span>
        <input type="text" [value]="teir.text" (input)="teir.text = $event.target.value; onValueUpdated();"/>
      </li>
      <li *ngFor="let item of propertyList; index as i;">
        <label>
          <span>{{propertyList[i].name}}</span>
          <input *ngIf="item.name!='rotation'" [type]="item.type" [value]="teir[item.name]" (input)="teir[item.name] = $event.target.value; onValueUpdated();"/>
          <input *ngIf="item.name=='rotation'" [type]="item.type" [value]="trig.radiansToDegrees(teir[item.name])" (input)="teir[item.name] = trig.degreesToRadians($event.target.value); onValueUpdated();"/>
        </label>
      </li>
      <li>
        <label>Tweens <input type="checkbox" [(ngModel)]="showTweens"></label>
        <tween-list [tweens]="teir.tweens" (updated)="onValueUpdated(e)" [pm]="pm" [teir]="teir" [show]="showTweens"></tween-list>
      </li>
      <li *ngIf="teir.children">
        <label>Children <input type="checkbox" [(ngModel)]="showChildren"></label>
        <display-tree-list *ngIf="showChildren" (updated)="onValueUpdated(e)" [pm]="pm" [items]="teir.children"></display-tree-list>
      </li>
      <li *ngIf="!adding && showChildren">
        <button (click)="adding=true;">Add Child</button>
      </li>
      <li *ngIf="adding">
        <add-item (canceled)="adding=false;" (confirmed)="addChildToItem($event)" [options]="pm.DisplayTypes"></add-item>
      </li>
    </ul>
    <confirm-delete (confirmed)="deleteSection(teir)"></confirm-delete>
  </div>`,
  styles: []
})
export class DisplayTreeItem extends BaseEmitterComponent{
  @Input() teir: any;
  @Input() pm: PixiManager;
  adding: boolean = false;
  trig:Trig = new Trig();
  showChildren: boolean = true;
  showTweens: boolean = true;
  reordering: boolean = false;

  // @Output() updated: EventEmitter<any> = new EventEmitter();
  propertyList: Array<any> = [];
  // ngOnInit(){
  //   for (var p in this.pm.Properties){
  //     this.propertyList.push(p);
  //   }
  // }
  ngOnInit(){
    // for (var p in this.pm.Properties){
    //   this.propertyList.push(p);
    // }
    let props = this.pm.getProperties(this.teir.type, true)
    for (var p in props){
      this.propertyList.push(props[p]);
    }
  }
  getDragClass(){
    return this.reordering ? 'item-reordering' : ''
  }
  hasSource(type:string):boolean{
    return type == this.pm.DisplayTypes.Image;
  }
  hasText(type:string):boolean{
    return type == this.pm.DisplayTypes.Text;
  }
  addChildToItem(e):void{
    console.log(e);
    if (!this.teir.children) {
      this.teir.children = [];
    }
    var subTeir:any = {type: e};
    this.pm.addTeir(e, subTeir);
    this.teir.children.push(subTeir);
    this.adding = false;
    this.onValueUpdated();
  }
  onHandleDown(e):void{
    console.log('drag down');
    this.reordering = true;
  }
  onHandleMove(e):void{

  }
  onHandleUp(e):void{
    this.reordering = false;
  }
  // onValueUpdated(){
  //   this.updated.emit(null);
  // }
}
