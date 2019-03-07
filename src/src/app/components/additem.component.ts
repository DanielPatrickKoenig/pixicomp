import {Component, Input, Output, EventEmitter} from '@angular/core';
import PixiManager from '../objects/PixiManager';
@Component(
  {
    selector: 'add-item',
    template: `<div>
      <select [(ngModel)]="selectedType">
        <option value="none">Select a type</option>
        <option [value]="options[p]" *ngFor="let p of getKeys(options);">{{p}}</option>
      </select>
      <div>
        <button (click)="onCancel(e)">Cancel</button><button *ngIf="selectedType != 'none'" (click)="onConfirm(e)">Add</button>
      </div>
    </div>`,
    styles: []
  }
)
export class AddItem{
  @Input() options: any;
  @Output() canceled: EventEmitter<any> = new EventEmitter();
  @Output() confirmed: EventEmitter<string> = new EventEmitter();
  selectedType: string = 'none';
  getKeys(obj){
    var keys = [];
    for(var o in obj){
      keys.push(o);
    }
    return keys;
  }
  onCancel(e){
    this.canceled.emit(null);
  }
  onConfirm(e){
    this.confirmed.emit(this.selectedType);
  }
}
