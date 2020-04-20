import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatListModule, MatGridListModule } from '@angular/material';
import { MainViewComponent } from './main-view/main-view.component';
import { LayoutViewComponent } from './layout-view/layout-view.component';
import { ToolsViewComponent } from './tools-view/tools-view.component';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { MatSlideToggleModule, MatTabsModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { CodeViewComponent } from './code-view/code-view.component';
import { PortConfigViewComponent } from './port-config-view/port-config-view.component';
import { ApperanceViewComponent } from './apperance-view/apperance-view.component';
import { MarkdownViewComponent } from './markdown-view/markdown-view.component';
import { OprPropertyViewComponent } from './opr-property-view/opr-property-view.component';
import { FlowEditorViewComponent } from './flow-editor-view/flow-editor-view.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GraphEditorViewComponent } from './graph-editor-view/graph-editor-view.component';
import { GraphToolsViewComponent } from './graph-tools-view/graph-tools-view.component';
import { FlowTileViewComponent } from './flow-tile-view/flow-tile-view.component';
import { FlowApiViewComponent } from './flow-api-view/flow-api-view.component';
import { FlowEventViewComponent } from './flow-event-view/flow-event-view.component';
import { FlowTriggerViewComponent } from './flow-trigger-view/flow-trigger-view.component'; 


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LayoutViewComponent,
    ToolsViewComponent,
    EditorViewComponent,    
    CodeViewComponent,
    PortConfigViewComponent,
    ApperanceViewComponent,
    MarkdownViewComponent,
    OprPropertyViewComponent,
    FlowEditorViewComponent,
    GraphEditorViewComponent,
    GraphToolsViewComponent,
    FlowTileViewComponent,
    FlowApiViewComponent,
    FlowEventViewComponent,
    FlowTriggerViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    OverlayModule,
    MatGridListModule,
    DragDropModule,
    ResizableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,
    HttpClientModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule
  ],
  entryComponents:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
