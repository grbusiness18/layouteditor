import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {apperanceEditorUIObject, codeEditorUIObject} from '../shared/iObjects';
import { MarkdownViewComponent } from '../markdown-view/markdown-view.component';

@Component({
  selector: 'app-apperance-view',
  templateUrl: './apperance-view.component.html',
  styleUrls: ['./apperance-view.component.css']
})
export class ApperanceViewComponent implements OnInit {

  @ViewChild(MarkdownViewComponent, {"static": false }) mvc: MarkdownViewComponent;
  @Input() data = {} as any;

  public isChanged: boolean = false;


  constructor() { }

  ngOnInit() {
    console.log("Data Apperance", this.data);    
    if ("functionName" in this.data["runtime"]){

    }
  }



}
