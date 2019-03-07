import {Component, Input, Output, EventEmitter} from '@angular/core';
import PixiManager from '../objects/PixiManager';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
@Component({
  selector:'tween-step',
  template: `
  <label>Duration <input type='number' [value]='step.duration' (input)='step.duration = $event.target.value; onValueUpdated();'></label>
  <label>Properties</label>
  <ul>
    <li *ngFor="let p of getProprtiesFromStep(step.properties);">
      <label>{{p}} <input type="number" [value]="step.properties[p]" (input)="step.properties[p] = $event.target.value; onValueUpdated();"></label>
      <confirm-delete (confirmed)="deleteProperty(p)"></confirm-delete>
    </li>
    <li *ngIf="!adding" (click)="adding=true">
      <button>Add Property</button>
    </li>
    <li *ngIf="adding">
      <add-item (canceled)="adding=false;" (confirmed)="addProperty($event)" [options]="pm.Properties"></add-item>
    </li>
  </ul>
  <confirm-delete (confirmed)="deleteSection(step)"></confirm-delete>
  `,
  styles: ['']
})
export class TweenStep extends BaseEmitterComponent{
  @Input() step: any;
  @Input() pm: PixiManager;
  adding: boolean;
  getProprtiesFromStep(_propList: any):Array<string>{
    var propList:Array<string> = [];
    for (var p in _propList) {
      propList.push(p);
    }
    // console.log(_propList)
    return propList;
  }
  addProperty(e){
    this.step.properties[e.toString()] = 0;
    this.onValueUpdated();
    this.adding = false;
  }
  deleteProperty(p){
    delete this.step.properties[p];
    this.onValueUpdated();
  }

}
