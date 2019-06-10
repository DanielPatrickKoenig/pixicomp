import { Component, Input } from "@angular/core";
import PixiManager from '../objects/PixiManager';
@Component({
  selector: 'timeline',
  template: `<div>
    <ul *ngIf="scope.tweens != undefined && scope.tweens != null">
      <li *ngFor="let t of scope.tweens;" [ngStyle]="getTweenLineStyle(t)">
        <tweenline [tween]="t"></tweenline>
      </li>
    </ul>
  </div>`
})
export class Timeline {
  @Input() scope: any;
  getTweenLineStyle(tween) {
    let highestCount = 0;
    let pm:PixiManager = new PixiManager();
    let propBaseHeight = pm.TweenUIValues.baseHeight;
    let widthFactor = pm.TweenUIValues.baseWidth;
    let totalDuration = 0;
    for (let i = 0; i < tween.steps.length; i++) {
      let step = tween.steps[i];
      totalDuration+=step.duration;
      let pCount = 1;
      for (let p in step.properties) {
        pCount++;
      }
      if (pCount > highestCount){
        highestCount = pCount;
      }
    }
    return {height: (highestCount * propBaseHeight).toString() + 'px', width: (widthFactor * totalDuration) + 'px', display: 'block'};
  }
}
