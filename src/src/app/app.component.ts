import { Component } from '@angular/core';
import TestingObj from './objects/TestingObj'
import ConfigLoader from './objects/ConfigLoader'
import PixiManager from './objects/PixiManager';
@Component({
  selector: 'app-root',
  template: `
    <div ng-if="cData != undefined && cData != null">
      <pixi-stage [pm]="pm" [configdata]="scopeList" [version]="version"></pixi-stage>
      <drag-proxy-stage [pm]="pm" [scope]="scopeList" (updated)="onValueUpdated(e)"></drag-proxy-stage>
      <display-tree-list (updated)="onValueUpdated(e)" [pm]="pm" [items]="cData"></display-tree-list>
      <button id="openbuttonelement" style="display:none;" (click)="onOpened($event)">OPEN</button>
      <label>Should Edit Children <input type="checkbox" [(ngModel)]="shouldEditChildren" (change)="onEditChildrenChange()" /></label>
      <timeline *ngIf="scopedItem != null" [scope]=scopedItem></timeline>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title: string = 'pixi-animation-composer';
  cData: Array<any> = [];
  stuff: TestingObj = new TestingObj(4, 7);
  pm: PixiManager = new PixiManager();
  version: number = Math.random();
  scopedItem: any = null;
  scopeList: Array<any> = [];
  shouldEditChildren: boolean = false;
  onStart(e){
    console.log('Start');
  }
  onStop(e){
    console.log('Stop');
  }
  onValueUpdated(e){
    // console.log('updated !!!');
    this.version = Math.random();
    var savedContentContainer: HTMLElement = document.getElementById("saveablecontentdiv");
    if(savedContentContainer){
      savedContentContainer.innerHTML = JSON.stringify(this.cData);
    }
    setTimeout(this.manageScope, 100, this);
  }
  onOpened(e){
    var savedContentContainer: HTMLElement = document.getElementById("saveablecontentdiv");
    // console.log('opened clicked!!!!!!!!!!!!');
    if(savedContentContainer){
      this.cData = JSON.parse(savedContentContainer.innerHTML);
      // setTimeout(this.manageScope, 100, this);
      // savedContentContainer.innerHTML = JSON.stringify(this.cData);
    }
  }
  ngOnInit(){
    var configPath: string = './assets/marker.json';
    var self:AppComponent = this;
    // new ConfigLoader(configPath + '?x=' + Math.random().toString().split('.').join(''), (content) => {
    //   self.cData = JSON.parse(content);
    //   console.log(self.cData);
    // });
  }
  getScope(){
    var scopeList = this.cData;
    if(this.scopedItem != null){
      if(this.scopedItem.children){
        scopeList = this.scopedItem.children;
      }
    }
    return scopeList;
  }
  getScopedItems(inList, comp, outList):Array<any>{
    for(var i = 0; i < inList.length; i++) {
      if(inList[i].isMainScope){
        outList.push(inList[i]);
      }
      if(inList[i].children){
        comp.getScopedItems(inList[i].children, comp, outList);
      }
    }
    return outList;
  }
  manageScope(comp){
    var scoped: Array<any> = comp.getScopedItems(comp.cData, comp, []);
    if(comp.scopedItem == null) {
      comp.scopedItem = scoped[0];
    }
    else{
      if(scoped.length > 1){
        for(var i = scoped.length-1;i>=0;i--){
          // console.log(scoped[i].id);
          // console.log(comp.scopedItem.id);
          if(scoped[i].id == comp.scopedItem.id){
            // console.log("Match !!!!!!!!!!!!!!");
            scoped[i].isMainScope = false;
            scoped.splice(i, 1);
          }
        }
        comp.scopedItem = scoped[0];
      }
      else if (scoped.length == 1) {
        comp.scopedItem = scoped[0];
      }
      else if (scoped.length == 0) {
        comp.scopedItem = null;
      }
    }

    comp.scopeList = comp.cData;
    if(comp.scopedItem != null){
      if(comp.scopedItem.children){
        comp.scopeList = this.shouldEditChildren ? comp.scopedItem.children : [comp.scopedItem];//comp.scopedItem.children;
      }
      else{
        comp.scopeList = [comp.scopedItem];
      }
    }
    // console.log(comp.scopeList);
  }
  onEditChildrenChange(){
    this.manageScope(this)
  }
}
