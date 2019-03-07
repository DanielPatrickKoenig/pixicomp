import {Component, Input} from '@angular/core';
import {Tween} from './tween.component';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
import PixiManager from '../objects/PixiManager';
@Component({
  selector: 'tween-list',
  template: `<ul *ngIf='tweens && show'>
    <li *ngFor='let t of tweens;'>
      <tween [props]="t" [pm]="pm" (updated)="onValueUpdated(e);removeFlaggedSections(tweens);"></tween>
    </li>
    <li>
      <button (click)="addTween()">Add Tween</button>
    </li>
  </ul>
  <ul *ngIf='!tweens || !show'>
    <li>
      <button (click)="addTween()">Add Tween</button>
    </li>
  </ul>`,
  styles: []
})
export class TweenList extends BaseEmitterComponent{
  @Input() tweens: Array<any>;
  @Input() pm: PixiManager;
  @Input() teir: any;
  @Input() show: boolean;
  addTween(){
    if (!this.teir.tweens) {
      this.teir.tweens = [];
    }
    this.teir.tweens.push({loop: false, steps: []})
  }
}
