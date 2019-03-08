import { Component, Input } from "@angular/core";
@Component({
  selector: 'timeline',
  template: `<div>
    <ul *ngIf="scope.tweens != undefined && scope.tweens != null">
      <li *ngFor="let t of scope.tweens;">
        !TWEEN!
        <tweenline [tween]="t"></tweenline>
      </li>
    </ul>
  </div>`
})
export class Timeline {
  @Input() scope: any;
}
