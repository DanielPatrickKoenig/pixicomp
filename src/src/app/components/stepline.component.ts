import { Component, Input } from "@angular/core";

@Component({
  selector: 'stepline',
  template: `<ul>
    <li *ngFor="let p of getPropList();">
      {{p.name}} : {{p.value}}
    </li>
  </ul>`
})
export class Stepline{
  @Input() step:any;
  getPropList(){
    var pList:Array<any> = [];
    for(var p in this.step.properties){
      pList.push({name: p, value: this.step.properties[p]});
    }
    return pList;
  }
}
