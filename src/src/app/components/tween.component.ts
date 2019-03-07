import {Component, Input} from '@angular/core';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
import PixiManager from '../objects/PixiManager';
@Component({
  selector: 'tween',
  template: `<div>
    <label>
      Loop
      <input type='checkbox' [(ngModel)]='props.loop' (click)="onValueUpdated();">
    </label>
    <label>Steps</label>
    <ul>
      <li *ngFor="let step of props.steps; index as i;">
        <tween-step [step]="step" [pm]="pm" (updated)="onValueUpdated(e);removeFlaggedSections(props.steps);"></tween-step>
      </li>
      <li *ngIf="!addingStep">
        <button (click)="addStep($event)">Add Step</button>
      </li>
    </ul>
    <confirm-delete (confirmed)="deleteSection(props)"></confirm-delete>
  </div>`,
  styles: []
})
export class Tween extends BaseEmitterComponent{
  @Input() props: any;
  @Input() pm: PixiManager;
  // propListMatrix: Array<Array<string>> = [];
  adding: boolean = false;
  // getProprtiesFromStep(_propList: any):Array<string>{
  //   var propList:Array<string> = [];
  //   for (var p in _propList) {
  //     propList.push(p);
  //   }
  //   return propList;
  // }
  ngOnInit(){
    // for (var i = 0; i < this.props.steps.length; i++) {
    //   var propList: Array<string> = this.getProprtiesFromStep(this.props.steps[i]);
    //   this.propListMatrix.push(propList);
    // }
  }
  toggleLoop(){
    this.props.loop = !this.props.loop;
  }
  addStep(e){
    this.props.steps.push({duration: .5, properties: {}});
    // step.push()
  }
}
