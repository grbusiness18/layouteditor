import { Component, OnInit, ViewChild } from '@angular/core';
import { TxnService } from '../services/txn.service';
import { UtilService } from '../services/util.service';
import ShortUniqueId from 'short-unique-id';
import { SiblingShareService } from '../services/sibling-share.service';
import { GraphEditorViewComponent } from '../graph-editor-view/graph-editor-view.component'

@Component({
  selector: 'app-flow-editor-view',
  templateUrl: './flow-editor-view.component.html',
  styleUrls: ['./flow-editor-view.component.css']
})
export class FlowEditorViewComponent implements OnInit {

  @ViewChild(GraphEditorViewComponent, { "static": false }) gevc: GraphEditorViewComponent;

  private flow = {} as any ;
  public activeFlow: string = "";

  constructor(private txn: TxnService, private ss: SiblingShareService, private util: UtilService) { }

  ngOnInit() {
    this.flow = this.util.doGetFlowData();
  }



  /*
  onFlowTabClick($event){    
    this.activeFlow = this.flows[$event.index].id;
    console.log("Selected Flow:", this.activeFlow)
    var obj = {
      "event" : "activeflow",
      "id" : this.activeFlow
    }
    this.ss.changeMessage(JSON.stringify(obj));    
  }

  onGetFlows(){
    this.txn.getFlows().subscribe(data=>{
      console.log("Flows:", data)
      this.flows = <any>data
    });
  }

  onCreateFlow(){
    this.txn.createFlow().subscribe(data=>{
      this.onGetFlows();
    });
  }

  onSettingsClick(){
    console.log("selected opr ", this.gevc.srcOpr)
  }*/


}
