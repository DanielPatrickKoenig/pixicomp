import {Component, Input, Output, EventEmitter} from '@angular/core';
import PixiManager from '../objects/PixiManager';
import {DisplayTreeItem} from './displaytreeitem.component';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
@Component({
  selector: 'display-tree-list',
  template:`<ul class="display-tree-list-component">
    <li *ngFor="let item of items;">
      <display-tree-item (updated)="onValueUpdated(e);removeFlaggedSections(items);" [pm]="pm" [teir]="item"></display-tree-item>
    </li>
    <li *ngIf="!adding">
      <button (click)="adding=true;">Add Sibling</button>
    </li>
    <li *ngIf="adding">
      <add-item (canceled)="adding=false;" (confirmed)="addSibling($event)" [options]="pm.DisplayTypes"></add-item>
    </li>
  </ul>`,
  styles:[]
})
export class DisplayTreeList extends BaseEmitterComponent{
  @Input() items: Array<any>;
  @Input() pm: PixiManager;
  adding: boolean = false;
  addSibling(e):void{
    console.log(e);
    var subTeir:any = {type: e};
    this.pm.addTeir(e, subTeir);
    this.items.push(subTeir);
    this.adding = false;
    this.onValueUpdated();
  }
  // @Output() updated: EventEmitter<any> = new EventEmitter();
  // onValueUpdated(e){
  //   this.updated.emit(null);
  // }
}
