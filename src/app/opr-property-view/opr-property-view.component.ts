import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { codeEditorUIObject, apperanceEditorUIObject, portConfigUIObject } from '../shared/iObjects';
import { CodeViewComponent } from '../code-view/code-view.component';
import { ApperanceViewComponent } from '../apperance-view/apperance-view.component';
import { PortConfigViewComponent } from '../port-config-view/port-config-view.component'
import { TxnService } from '../services/txn.service';
import { UtilService } from '../services/util.service';
import { SiblingShareService } from '../services/sibling-share.service';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


@Component({
  selector: 'app-opr-property-view',
  templateUrl: './opr-property-view.component.html',
  styleUrls: ['./opr-property-view.component.css']
})
export class OprPropertyViewComponent implements OnInit, OnDestroy {

  @ViewChild(CodeViewComponent, { "static": false }) cvc: CodeViewComponent;
  @ViewChild(ApperanceViewComponent, { "static": false }) avc: ApperanceViewComponent;
  @ViewChild(PortConfigViewComponent, { "static": false }) pvc: PortConfigViewComponent;


  private routeSub: any
  private operatorID: string
  private flow: any;
  private opr = {} as any;
  private components = [];



  constructor(private route: ActivatedRoute, private location: Location,
    private txn: TxnService,
    private util: UtilService,
    private ss: SiblingShareService,
    private dialogRef: MatDialogRef<OprPropertyViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.flow = this.util.doGetFlowData();
    console.log("FLow in Property:", this.flow);
    var that = this
    /*
    this.routeSub = this.route.params.subscribe(params => {
      that.operatorID = params['id'];
      that.opr = that.flow['operators'].filter(op => op['id'] === params['id'])[0];
      console.log("Router property: ", params['id'], that.opr);
    });
    */

    that.opr = that.flow['operators'].filter(op => op['id'] === this.data['id'])[0];
    console.log("Router property: ", this.data['id'], that.opr);
    this.doParseComponents()

  }

  doParseComponents() {
    var that = this
    console.log("Operator", this.opr);
    this.opr['metadata']['components'].forEach(cmp => {
      console.log("Components", cmp);
      this.txn.getComponentByID(cmp).subscribe(data => {
        that.components.push(data[0])
      });
    });
  }

  ngOnDestroy() {
    this.util.doSetFlowData(this.flow);
    //this.routeSub.unsubscribe();
  }

  onDeleteOperator() {
    this.location.back();
  }

  onCancelOperator() {
    var obj = {
      "event": "ignore",
      "id": "previous"
    }
    this.ss.changeMessage(JSON.stringify(obj))
    this.location.back();
  }

  onSaveOperator() {

    this.doSaveCodeEditor();
    this.doSaveApperanceEditor();
    this.doSavePortEditor();

    console.log("Operator: ", this.opr);
  }

  onCloseEvent() {

    var obj = {
      "event": "ignore",
      "id": "previous"
    }
    this.ss.changeMessage(JSON.stringify(obj))
    this.dialogRef.close()
  }

  doSaveCodeEditor() {
    if (this.cvc.isChanged) {
      var cmp = this.opr.components.filter(cmp => cmp['id'] === this.cvc.data['id'])
      if (cmp.length > 0) {
        cmp[0] = this.cvc.data;
      } else {
        this.opr.components.push(this.cvc.data);
      }
    }
  }

  doSaveApperanceEditor() {
    if (this.avc.mvc.isChanged) {
      var cmp = this.opr.components.filter(cmp => cmp['id'] === this.avc.data['id'])
      if (cmp.length > 0) {
        cmp[0] = this.avc.data;
      } else {
        this.opr.components.push(this.avc.data);
      }
    }
  }

  doSavePortEditor() {

    if (this.pvc.inports.length !== this.opr['inports'].length) {

      var delports = this.opr['inports'].filter(sp => {
        var aids = this.pvc.inports.map(s => { return s.id });
        return aids.indexOf(sp.id) === -1;
      });

      console.log(" Deleted Ports ", delports);
      this.doDeletePortConnections(this.opr['id'], delports, true);
      this.opr['inports'] = this.pvc.inports;
    }

    if (this.pvc.outports.length !== this.opr['outports'].length) {
      var delports = this.opr['inports'].filter(sp => {
        var aids = this.pvc.inports.map(s => { return s.id });
        return aids.indexOf(sp.id) === -1;
      });

      console.log(" Deleted outports ", delports);
      this.doDeletePortConnections(this.opr['id'], delports, false);
      this.opr['outports'] = this.pvc.outports;
    }
  }

  doDeletePortConnections(oprid, aports, inp: boolean) {
    if (inp) {
      this.flow['connections'] = this.flow['connections'].filter(con => {
        return aports.indexOf(con['tar']['pid']) === -1;
      })
    } else {
      this.flow['connections'] = this.flow['connections'].filter(con => {
        return aports.indexOf(con['src']['pid']) === -1;
      })
    }
  }
}
