import { Component, OnInit } from '@angular/core';
import { SiblingShareService } from '../services/sibling-share.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { flowElement, conObject } from '../shared/interface';
import { operatorObject, nodeObject, portObject, portHandler } from '../shared/iObjects'
import * as $ from 'jquery';
import ShortUniqueId from 'short-unique-id';
import * as d3 from "d3";

import { Router } from '@angular/router';


declare let $: any;


@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.css']
})

export class LayoutViewComponent implements OnInit {

  public testtitle: any[] = [1,3,4,2,5,6];

  public ops: operatorObject[] = [];
  public newElementAdded: boolean = false;
  public oContainer: any = {};

  private sSelectedItem: string = "";
  private bDrawConnection: boolean = false;
  private aNodes: nodeObject[] = [];
  private aConnections: conObject[] = [];

  constructor(private data: SiblingShareService,
    public matDialog: MatDialog, private router: Router) {
    jqueryinithandler(this)
  }

  ngOnInit() {
    var that = this
    this.data.currentMsg.subscribe(function (msg) {
      console.log("Msg Rec:", JSON.parse(msg));
      if ("default-msg" in JSON.parse(msg)) {
        return
      }
      that.doCreateElement(JSON.parse(msg))
    });

  }

  onClick(id, typ, idx) {
    if (typ === "ip" && this.sSelectedItem !== "") {
      this.bDrawConnection = true
    }

    if (this.bDrawConnection) {
      this.bDrawConnection = false
      var cid = new ShortUniqueId().randomUUID(6);
      this.doDrawConnection(cid, this.sSelectedItem, id + "-" + idx);
      this.doNewConnection(cid, this.sSelectedItem, id + "-" + idx);
    }

    this.doDeSelectItem();
    this.doSelectItem(id, typ, idx);
  }

  onOperatorClick(id) {
    this.doSelectItem(id, "h", 0);
  }

  // Node Manager 
  doAddNode(id: string) {
    var oNODE = {} as nodeObject;
    oNODE.id = id
    oNODE.inports = []
    oNODE.outports = []
    this.aNodes.push(oNODE)
  }

  doGetNode(id: string) {
    return this.aNodes.filter(oNode => oNode.id === id)
  }

  doDelNode(id: string) {
    this.aNodes = this.aNodes.filter(oNode => oNode.id !== id);
    this.ops = this.ops.filter(ocomp => ocomp.id !== id);
  }

  doAddPort(nid: string, inp: boolean, con: conObject) {
    var onode = this.doGetNode(nid)[0]
    if (inp) {
      onode.inports.push(con)
    } else {
      onode.outports.push(con)
    }
  }

  doGetPort(nid: string, inp: boolean, cid: string) {
    var onode = this.doGetNode(nid)[0]
    if (inp) {
      return onode.inports.filter(oport => oport.cid === cid)
    } else {
      return onode.outports.filter(oport => oport.cid === cid)
    }
  }

  doDeletePort(nid: string, inp: boolean, cid: string) {
    var onode = this.doGetNode(nid)[0]
    if (inp) {
      onode.inports = onode.inports.filter(oport => oport.cid !== cid)
    } else {
      onode.outports = onode.outports.filter(oport => oport.cid !== cid)
    }
  }

  doNewConnection(cid: string, sid: string, tid: string) {
    var ocon = {} as conObject
    ocon.cid = cid
    ocon.sid = sid
    ocon.tid = tid
    var snode = this.doGetNode(sid.substring(0, 6))
    snode[0].outports.push(ocon);
    var tnode = this.doGetNode(tid.substring(0, 6))
    tnode[0].inports.push(ocon);
    this.aConnections.push(ocon);
  }

  doGetConnection(cid: string) {
    return this.aConnections.filter(ocon => ocon.cid === cid);
  }



  doDeleteConnection(cid: string) {
    var acon = this.doGetConnection(cid)
    var that = this
    acon.forEach(el => {
      that.doDeletePort(el.sid.substring(0, 6), true, el.cid)
      that.doDeletePort(el.sid.substring(0, 6), false, el.cid)
      that.doDeletePort(el.tid.substring(0, 6), true, el.cid)
      that.doDeletePort(el.tid.substring(0, 6), false, el.cid)
    });
    this.aConnections = this.aConnections.filter(ocon => ocon.cid !== cid);
  }

  // on Create Element
  doCreateElement(msg) {
    var oModal = {} as operatorObject;
    oModal = msg;
    oModal.id = new ShortUniqueId().randomUUID(6);
    oModal.runtime = {} as portObject
    oModal.runtime.inports = []
    oModal.runtime.outports = []
    console.log("Runtime NEw",msg);
    var oPort = {} as portHandler
    oPort.id = oModal.id+ "-"+ 0
    oPort.idx = 0
    oPort.connections = []  
    if (oModal.metadata.config.hasInport){
      oPort.typ = "in"
      oModal.runtime.inports.push(oPort)
    }

    if (oModal.metadata.config.hasOutport){
      oPort.typ = "op"    
      oModal.runtime.outports.push(oPort)
    }
    this.ops.push(oModal);
    this.doAddNode(oModal.id);
    this.doAdoptUIforPorts();
  }

  doAdoptUIforPorts() {
    this.ops.forEach(op => {

      var oid = "#operator-edit-" + op.id;
      op.runtime.inports.forEach((ip, ipx) => {
        var pid = "#portholder-edit" + "-" + op.id + "-" + ipx
        $(function () {
          console.log(oid, pid, (ipx + 1) * 10 + 5);
          $(pid).css("margin-top", (ipx) * 10 + 5 + "px");
        });
      });

      op.runtime.outports.forEach((out, opx) => {
        var pid = "#outportholder-edit" + "-" + op.id + "-" + opx
        $(function () {
          console.log(oid, pid, (opx + 1) * 10 + 5);
          $(pid).css("margin-top", (opx) * 10 + 5 + "px");
        });
      });

      var cheight = (op.runtime.inports.length > op.runtime.outports.length) ?
        op.runtime.inports.length : op.runtime.outports.length;

      $(function () {
        // set height of operator
        $(oid).height((cheight * 12) > 30 ? cheight * 12 : 30);
        if (cheight > 3) {
          // set padding of innerbox
          $("#innerbox-edit-" + op.id).css("padding-top", cheight * 4);
        }
      });
    });
  }

  doSelectItem(id, typ, idx) {
    var that = this
    $("#operator-edit-" + id).addClass("selectedItem");
    if (typ === "op") {
      $("#outport-edit-" + id + "-" + idx).addClass("selectedPort");
      this.sSelectedItem = id + "-" + idx
      console.log("ID selected", id, typ, idx);
    }

    if (typ === "ip") {
      this.sSelectedItem = id + "-" + idx
      $("#inport-edit-" + id + "-" + idx).addClass("selectedPort");
    }

    $("#cbox-edit-" + id).draggable({
      handle: "div.operator",
      start: function (e) { },
      drag: function (e) {
        var oNODE = that.doGetNode(id)
        oNODE[0].inports.forEach(ocon => {
          $("#" + ocon.cid).remove();
          that.doDeleteConnection(ocon.cid);
          that.doDrawConnection(ocon.cid, ocon.sid, ocon.tid);
          that.doNewConnection(ocon.cid, ocon.sid, ocon.tid);
        });
        oNODE[0].outports.forEach(ocon => {
          $("#" + ocon.cid).remove();
          that.doDeleteConnection(ocon.cid);
          that.doDrawConnection(ocon.cid, ocon.sid, ocon.tid);
          that.doNewConnection(ocon.cid, ocon.sid, ocon.tid);
        });
      },
      stop: function (e) { }
    });

  }

  doDeSelectItem() {
    console.log("ON deselect", this.sSelectedItem)
    if (this.sSelectedItem !== "") {
      $("#operator-edit-" + this.sSelectedItem).removeClass("selectedItem");
      $("#outport-edit-" + this.sSelectedItem).removeClass("selectedPort");
      $("#inport-edit-" + this.sSelectedItem).removeClass("selectedPort")
      $("#outport-edit-" + this.sSelectedItem).unbind();
      this.sSelectedItem = ""
      console.log("ON deselect after ", this.sSelectedItem)
    }
  }

  doDeleteSelected() {
    var that = this;
    if (this.sSelectedItem !== "") {
      console.log("Delet", this.sSelectedItem)

      this.doGetNode(this.sSelectedItem)[0].inports.forEach(el => {
        that.doDeleteConnection(el.cid);
        $("#" + el.cid).remove();
      });

      this.doGetNode(this.sSelectedItem)[0].outports.forEach(el => {
        that.doDeleteConnection(el.cid);
        $("#" + el.cid).remove();
      });

      $("#cbox-edit-" + this.sSelectedItem).remove();

    }
  }

  doDrawConnection(cid, sid, tid) {

    var that = this
    var src = $("#outport-edit-" + sid).offset();
    var tar = $("#inport-edit-" + tid).offset();
    console.log("Draw Connection", src, tar);

    var lineGenerator = d3.line()
      .curve(d3.curveBasis);

    var x1 = src.left - 265
    var y1 = src.top - 65
    var x2 = tar.left - 255
    var y2 = tar.top - 65

    var [c1, c2, c3, c4] = this.findCurvature(x1, y1, x2, y2);

    var pathData = "M" + x1 + "," + y1 + " C" + c1 + "," + c2
    pathData = pathData + " " + c3 + "," + c4 + " " + x2 + "," + y2
    console.log(pathData, x1, y1, x2, y2)
    var lpath = this.oContainer.append("path")
      .attr("id", cid)
      .attr("d", pathData)
      .attr("stroke-width", 4)
      .attr("stroke", "green")
      .attr("fill", "none");

    $("#" + cid).bind("click", function (e) {
      that.doDeSelectItem()
      console.log("Selected Line")
      $("#" + cid).css("stroke", "green");
      that.sSelectedItem = cid;
    });
  }

  findCurvature(x1, y1, x2, y2) {
    var [c1, c2, c3, c4] = [0.0, 0.0, 0.0, 0.0];
    var [dx, dy, slope, theta] = [0.0, 0.0, 0.0, 0.0]
    dx = x2 - x1
    dy = y2 - y1
    slope = dy / dx
    theta = Math.atan(slope)
    console.log("slope:", slope);
    console.log("theta:", theta);
    c1 = x1 + 100
    c2 = y1
    c3 = x1 + 40
    c4 = y2
    return [c1, c2, c3, c4]
  }

  // Open Property
  openModal(id) {
    /*
    var oNodeCopy = Object.assign({},this.ops.filter(op => op.id === id)[0]);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // cant close by clicking outside
    dialogConfig.height = $(document).height();
    dialogConfig.width = $(document).width();
    dialogConfig.data = oNodeCopy
    
    const modalDialog = this.matDialog.open(PropertyViewComponent, dialogConfig);

    var that = this
    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.event === "delete") {
        that.doDelNode(result.data.id);
      }
      if (result.event ==="cancel"){  
        var oNode = this.ops.filter(op => op.id === id)[0]
        oNode = result.data
        console.log("Result")   ;
      }
      that.doAdoptUIforPorts()
    }); */

    this.router.navigate(['/editor', id, 'property']);
  }

  onElementClick(id) {
    this.openModal(id)
  }

}

// Jquery

function jqueryinithandler(oinstance) {
  $(document).ready(function () {
    var oContainer = d3.select(".svgbox").append("svg").attr("width", 700).attr("height", 700);
    console.log("D3", oContainer);
    oinstance.oContainer = oContainer;

    $(document).click(function (e) {
      if ((!e.target.classList.contains("textbox") && !e.target.classList.contains("iconbox") && !e.target.classList.contains("portbox")) && (oinstance.sSelectedItem !== "")) {
        console.log("Layout clicked", e.target.classList);
        oinstance.doDeSelectItem()
      }
    });

    // key up on anywhere
    $(document).on("keyup", function (e) {
      if (e.keyCode == 8) {
        oinstance.doDeleteSelected();
      }
    });
  });
}

