import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DisplayTree } from './components/displaytree.component';
import { DisplayTreeItem } from './components/displaytreeitem.component';
import { DisplayTreeList } from './components/displaytreelist.component';
import { PixiStage } from './components/pixistage.component';
import {TweenList} from './components/tweenlist.component';
import {Tween} from './components/tween.component';
import {AddItem} from './components/additem.component';
import { TweenStep } from './components/tweenstep.component';
import {ConfirmDelete} from './components/confirmdelete.component';
import {DrageProxyStage} from './components/dragproxystage.component';
import {DragProxy} from './components/dragproxy.component';
import {Timeline} from './components/timeline.component';
import {Tweenline} from './components/tweenline.component';
import {Stepline} from './components/stepline.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayTree,
    PixiStage,
    DisplayTreeItem,
    DisplayTreeList,
    TweenList,
    Tween,
    AddItem,
    TweenStep,
    ConfirmDelete,
    DrageProxyStage,
    DragProxy,
    Timeline,
    Tweenline,
    Stepline
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
