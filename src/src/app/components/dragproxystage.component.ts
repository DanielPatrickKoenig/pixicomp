import { Component, Input } from "@angular/core";
import PixiManager from '../objects/PixiManager';
import {DragProxy} from './dragproxy.component';
import { BaseEmitterComponent } from '../objects/BaseEmitterComponent';
@Component({
  selector: 'drag-proxy-stage',
  template: `
  <div class="drag-proxy-stage">
    <drag-proxy *ngFor="let item of scope;" [item]="item" [pm]="pm" (updated)="onValueUpdated();"></drag-proxy>
  </div>
  `,
  styles: []
})
export class DrageProxyStage extends BaseEmitterComponent{
  @Input() scope: any;
  @Input() pm: PixiManager;
  // getItemStyle(item){
  //   return {'cx':item.x, 'cy':item.y,'width':item.width, 'height':item.height};
  // }
}
