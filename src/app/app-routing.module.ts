import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { LayoutViewComponent } from './layout-view/layout-view.component';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { OprPropertyViewComponent } from './opr-property-view/opr-property-view.component';
import { FlowTileViewComponent } from './flow-tile-view/flow-tile-view.component';
import { FlowApiViewComponent } from './flow-api-view/flow-api-view.component';
import { FlowEventViewComponent } from './flow-event-view/flow-event-view.component';
import { FlowTriggerViewComponent } from './flow-trigger-view/flow-trigger-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/flows', pathMatch: 'full' },
  { path: 'flow/:id/editor', component: EditorViewComponent },
  { path: 'flow/:id/settings', component: FlowTriggerViewComponent },
  { path: 'flows', component: FlowTileViewComponent },
  { path: 'api', component: FlowApiViewComponent },
  { path: 'event', component: FlowEventViewComponent },
  { path: 'trigger', component: FlowTriggerViewComponent },

{ path: 'editor/:id/property', component: OprPropertyViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
