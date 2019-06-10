import { Component, Input } from "@angular/core";
import PixiManager from '../objects/PixiManager';
@Component({
  selector: 'tweenline',
  template: `<ul style="position:relative;">
    <li class="timeline-block" *ngFor="let s of tween.steps; index as i" [ngStyle]="getBlockStyle(i)">
      {{s.duration}}
      <stepline [step]='s'></stepline>
    </li>
  </ul>`
})
export class Tweenline{
  @Input() tween:any;
  getBlockStyle(index) {
    let leftPos = 0;
    let pm:PixiManager = new PixiManager();
    let propBaseHeight = pm.TweenUIValues.baseHeight;
    let widthFactor = pm.TweenUIValues.baseWidth;
    let highestPCount = 0;
    for (let i = 0; i <= index; i++) {
      if (i < index) {
        leftPos+=this.tween.steps[i].duration * widthFactor;
      }
      let pCount = 1;
      for (let p in this.tween.steps[index].properties) {
        pCount++;
      }
      if (pCount > highestPCount) {
        highestPCount = pCount;
      }
    }
    return {width: (this.tween.steps[index].duration * widthFactor).toString() + 'px', display: 'inline-block', position: 'absolute', top: '0', left: leftPos.toString() + 'px', height: (propBaseHeight * highestPCount).toString() + 'px', boxShadow: '0 0 0 1px #000000'}
    // return 'width:' + (this.tween.steps[index].duration * this.widthFactor).toString() + 'px;display:inline-block;position:absolute;top:0;left:' + leftPos.toString() + 'px;min-height:30px;box-shadow:0 0 0 1px #000000;';
  }
}
