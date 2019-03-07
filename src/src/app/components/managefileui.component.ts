import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'file-ui',
  template: `<div>
    <button (click)="saveClicked">Save</button>
    <button (click)="saveClicked">Open</button>
  </div>`,
  styles: []
})
export class ManageFileUI{

}
