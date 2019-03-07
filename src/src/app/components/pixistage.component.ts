import {Component, Input} from '@angular/core';
import PixiManger from '../objects/PixiManager'
import PixiComposite from '../objects/PixiComposite';
@Component({
  selector: 'pixi-stage',
  template: `<div id='pixistagecontainer'></div>`,
  styles: []
})
export class PixiStage{

  comp: PixiComposite;
  @Input() pm: PixiManger;
  @Input() configdata: object;
  @Input() version: number;
  initPixi():void{
    //new PixiManger(document.getElementById("pixistagecontainer"), 500, 500, 0xcc0000);
    // new PixiComposite(this.app, './assets/marker.json');
  }
  ngAfterViewInit(){
    this.updateComp();
  }
  updateComp(){
    if(this.comp){
      this.comp.update(this.configdata);
    }
    else{
      // this.pm = new PixiManger();
      this.pm.init(document.getElementById("pixistagecontainer"), 500, 500, 0xcc0000);
      this.comp = new PixiComposite(this.pm, this.configdata);
    }
  }
  ngOnChanges(){
    this.updateComp();
  }
}
