import {Component, Input, Output, EventEmitter} from '@angular/core';
import TestingObj from '../objects/TestingObj';
@Component({
  selector: 'display-tree',
  template: `<ul>
    <li>Stuff goes here</li>
    <li>More stuff goes here</li>
    <li>{{passedcontent.a}}</li>
    <li><a (click)="startClicked()">Start</a></li>
    <li><a (click)="stopClicked()">Stop</a></li>
  </ul>
  `,
  styles: []
})
export class DisplayTree {
  @Input() passedcontent: TestingObj;
  @Output() start: EventEmitter<any> = new EventEmitter();
  @Output() stop: EventEmitter<any> = new EventEmitter();
  stopClicked() {
    this.stop.emit(null);
    console.log(this.passedcontent);
  }
  startClicked() {
    this.start.emit(null);
  }
}
