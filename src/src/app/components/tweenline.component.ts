import { Component, Input } from "@angular/core";
@Component({
  selector: 'tweenline',
  template: `<ul>
    <li *ngFor="let s of tween.steps;">
      {{s.duration}}
      <stepline [step]='s'></stepline>
    </li>
  </ul>`
})
export class Tweenline{
  @Input() tween:any;
}
