import { Component, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'confirm-delete',
  template: `
  <button *ngIf="!confirming" class="delete-section-button" (click)="onDeleteClicked($event)"></button>
  <div *ngIf="confirming" class="delete-confirmation-modal">
    <div>
      <span>Are you sure you want to delete this item?</span>
      <button (click)="onOkCkicked($event)">OK</button><button (click)="onCancelClicked($event)">Cancel</button>
    </div>
  </div>
  `,
  styles: []
})
export class ConfirmDelete{
  @Output() confirmed: EventEmitter<any> = new EventEmitter();
  confirming: boolean = false;
  onDeleteClicked(e){
    this.confirming = true;
  }
  onOkCkicked(e){
    this.confirmed.emit(null);
    this.confirming = false;
  }
  onCancelClicked(e){
    this.confirming = false;
  }
}
