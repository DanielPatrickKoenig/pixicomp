import {Output, EventEmitter} from '@angular/core';
export class BaseEmitterComponent{
  @Output() updated: EventEmitter<any> = new EventEmitter();
  protected onValueUpdated(){
    this.updated.emit(null);
  }
  protected deleteSection(obj){
    obj.flagToDelete = true;
    this.removeFlaggedSections(obj);
    this.onValueUpdated();
  }
  private removeFlaggedSections(obj){
    if (obj.join) {
      for (var i = obj.length -1; i >= 0; i--) {
        if (obj[i].flagToDelete) {
          obj.splice(i, 1);
        }
      }
    }
    else {
      for (var o in obj) {
        if (obj[o].flagToDelete) {
          delete obj[o];
        }
      }
    }
  }
}
