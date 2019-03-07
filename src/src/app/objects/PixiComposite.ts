import PixiManager from './PixiManager';
import ConfigLoader from './ConfigLoader';
import {TweenLite} from 'gsap';
// import DisplayTeir from './DisplayTeir'
export default class PixiComposite{
  pm: PixiManager;
  container: any;
  constructor(_pm: PixiManager, _config: any){
    this.pm = _pm;
    this.update(_config);
  }
  public update(_config: any): void{
    if(this.container){
      this.pm.app.stage.removeChild(this.container);
    }
    this.container = new this.pm._PIXI.Sprite();
    this.pm.app.stage.addChild(this.container);
    var self = this;
    self.placeObjects(_config, this.container);
  }
  setDisplayProperty (teir, display, property) {
    if (teir[property]) {
      display[property] = teir[property]
    }
  }
  executeTweens(displayObject: any, tweenData: any, step: number, scope: PixiComposite){
    var props:any = {};
    if (tweenData) {
      if (tweenData.steps.length > 0) {
        for (var p in tweenData.steps[step].properties) {
          props[p] = tweenData.steps[step].properties[p];
        }
        props.onComplete = scope.executeTweens;
        if (tweenData.steps.length - 1 > step) {
          props.onCompleteParams = [displayObject, tweenData, step + 1, scope];
        }
        else if (tweenData.loop){
          props.onCompleteParams = [displayObject, tweenData, 0, scope];
        }
        TweenLite.to(displayObject, tweenData.steps[step].duration, props);
      }
    }
  }
  placeObjects(teir: object, parent: any):void{
    // console.log(teir);
    for (var t in teir) {
      var displayObject = {};
      switch (teir[t].type) {
        case this.pm.DisplayTypes.Container:{
          // console.log("CONTAINER");
          displayObject = new this.pm._PIXI.Container();
          break;
        }
        case this.pm.DisplayTypes.Sprite:{
          // console.log("SPRITE");
          displayObject = new this.pm._PIXI.Sprite();
          break;
        }
        case this.pm.DisplayTypes.Image:{
          // console.log("IMAGE");
          displayObject = this.pm.createImage(teir[t].src);
          break;
        }
        case this.pm.DisplayTypes.Circle:{
          // console.log("CIRCLE");
          displayObject = this.pm.createCircle({color: Number('0x' + teir[t].color), x: 0, y: 0, radius: teir[t].radius});
          break;
        }
      }
      for (var c in this.pm.Properties) {
        this.setDisplayProperty (teir[t], displayObject, this.pm.Properties[c]);
      }
      parent.addChild(displayObject);
      if (teir[t].children) {
        this.placeObjects(teir[t].children, displayObject);
      }
      if (teir[t].tweens) {
        for (var i = 0; i < teir[t].tweens.length; i++) {
          this.executeTweens(displayObject, teir[t].tweens[i], 0, this)
        }
      }
    }
  }
}
