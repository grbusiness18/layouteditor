import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SiblingShareService } from '../services/sibling-share.service';
import { TxnService } from '../services/txn.service';
import { UtilService } from '../services/util.service';
import ShortUniqueId from 'short-unique-id';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as d3 from "d3";
import { Location } from "@angular/common";
import { OprPropertyViewComponent } from '../opr-property-view/opr-property-view.component';

declare let $: any;

//dialog
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


//router 
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";



@Component({
  selector: 'app-graph-editor-view',
  templateUrl: './graph-editor-view.component.html',
  styleUrls: ['./graph-editor-view.component.css']
})
export class GraphEditorViewComponent implements OnInit {
  @Input() oFLOW = {} as any;
  private activeFlow: string = ""
  private currentFlow: string = ""
  private showContent: boolean = false;
  public srcPort: string = "";
  public srcOpr: any;
  private svgcontainer: any;
  private isNavBack: boolean = false;

  constructor(private ss: SiblingShareService,
    private txn: TxnService,
    private util: UtilService,
    private router: Router,
    private location: Location,
    private matdialog: MatDialog) { }

  ngOnInit() {
    console.log("Flow is:", this.oFLOW);
    this.currentFlow = this.oFLOW['id'];
    var that = this
    this.location.subscribe(x => {
      if (x['pop']) {
        that.isNavBack = true;
      }
    });

    if (!that.isNavBack) {
      this.ss.currentMsg.subscribe(function (msg) {
        var oMSG = JSON.parse(msg);
        if ("default-msg" in oMSG) {
          return
        }
        if ("event" in oMSG) {
          if (oMSG["event"] === "operatorClick") {
            console.log("Operator CLick", oMSG, that.activeFlow);
            that.doAddNewOperator(oMSG['id'])
            //that.ss.changeMessage('{"default-msg": "default message" }');
          }
        }
      });

    }

    jqueryinithandler(this);
    this.showContent = true;

    this.doDrawFlow();
  }

  ngOnDestroy() {
    console.log("Destroy from GRAPH EDitor");
    this.isNavBack = false;
  }


  onSaveFlow() {
    this.util.doSetFlowData(this.oFLOW, true)
  }

  doDrawFlow() {
    var that = this
    this.oFLOW['operators'].forEach(opr => {
      $(function () {
        $("#cbox-edit-" + opr['id']).css('top', opr['y'] + "px");
        $("#cbox-edit-" + opr['id']).css('left', opr['x'] + "px");
      });
      var oprID = opr['id']
      var asrc = that.doGetConnections(oprID, true)
      asrc.forEach(con => {
        $("#" + con['id']).remove();
        that.doDrawConnection(con['id'], con['src']['pid'], con['tar']['pid']);
      });

      var atar = that.doGetConnections(oprID, false)
      atar.forEach(con => {
        $("#" + con['id']).remove();
        that.doDrawConnection(con['id'], con['src']['pid'], con['tar']['pid']);
      });
    });
  }

  // add operator
  doAddNewOperator(opr_id: string) {
    var that = this
    this.txn.getOperatorMetadataByID(opr_id).subscribe(data => {
      var op = that.util.doCreateNewOperator(data[0])
      console.log("Operator", op)
      that.oFLOW.operators.push(op)
    });
  }


  doGetInnerBox(op: object) {
    var len = 1;
    var mheight = 30;
    len = (op['inports'].length > op['outports'].length) ? op['inports'].length : op['outports'].length
    var mheight = (len > 2) ? len * 10 + 30 : 30
    return {
      'min-height': mheight + "px", 'padding': len * (len + 0.5) + "px",
      'background-color': op['metadata']['innerbox']['background-color'],
      'color': op['metadata']['innerbox']['color'],
    }
  }

  doPortPositioning(op: object, inp: boolean) {
    var slen = (inp) ? op['inports'].length : op['outports'].length;
    var tlen = (inp) ? op['outports'].length : op['inports'].length;
    var mtop = 13;
    mtop = (slen > 1) ? ((slen * 10) + 30 / slen) / 2 - (slen * 3) : mtop;

    /* if (slen < tlen){
     mtop = ((tlen * 10) + 30 / tlen) / 2 - 10;
     mtop = (slen > 1) ? ((slen * 10) + 30 / slen) / 2 - (slen * 3) : mtop;    
   }*/
    return { 'top': mtop + "px" }
  }

  onOperatorClick(id) {
    console.log("OnOperator click", id);
    var that = this
    $(function () {
      $("#innerbox-edit-" + id).addClass("selectedOperator");
      $("#operator-edit-" + id).draggable({
        handle: "div.innerbox",
        start: function (e) { },
        drag: function (e) {      
          
          if ($("#operator-edit-"+id).position().left+ 100 > $("svg").width()){
            $("svg").css("width",  $("#operator-edit-"+id).position().left+ 300 +"px" );  
          }
          
          if ($("#operator-edit-"+id).position().top+ 100 > $("svg").height()){
            $("svg").css("height",  $("#operator-edit-"+id).position().top + 300 +"px" );
          }
         

          var oprID = e.target.id.split("-")[2];
          var asrc = that.doGetConnections(oprID, true)
          asrc.forEach(con => {
            $("#" + con['id']).remove();
            that.doDrawConnection(con['id'], con['src']['pid'], con['tar']['pid']);
          });

          var atar = that.doGetConnections(oprID, false)
          atar.forEach(con => {
            $("#" + con['id']).remove();
            that.doDrawConnection(con['id'], con['src']['pid'], con['tar']['pid']);
          });

        },
        stop: function (e) {

          that.doUpdateOperatorPosition(id);
          console.log("Aftre darag stop", $("#operator-edit-"+id).position(),$("#cbox-edit-"+id).offset());
         
          //opr[0]['x'] = $("#cbox-edit-"+id).offset().left;
          //opr[0]['y'] = $("#cbox-edit-"+id).offset().top;

        }
      });
    })
  }

  doUpdateOperatorPosition(id: string) {

    var opr = this.oFLOW['operators'].filter(op => {
      return op['id'] === id
    });
    if (opr.length > 0) {

      opr[0].x = $("#cbox-edit-" + id).offset().left;
      opr[0].y = $("#cbox-edit-" + id).offset().top;
    }

  }

  onOperatorDblClick(id) {
    console.log("Operator Double Clicked")
    this.util.doSetFlowData(this.oFLOW);
    this.openModal(id);
    //this.router.navigate(['/editor', id, 'property']);
  }

  doGetConnections(oid: string, isSrc: boolean) {
    return (isSrc) ? this.oFLOW['connections'].filter(el => el['src']['oid'] === oid) :
      this.oFLOW['connections'].filter(el => el['tar']['oid'] === oid)
  }


  onLayoutClick() {
    console.log("onLayoutClick");
  }

  onPortSelect(opr: object, pid: string, inp: boolean) {
    // console.log("port click", opr, pid, inp)        
    if (this.srcPort !== "" && inp && this.srcPort !== pid) {

      var cid = new ShortUniqueId().randomUUID(8);
      console.log("port click", opr, pid, inp, cid);
      this.doDrawConnection(cid, this.srcPort, pid);
      this.doCreateConnection(this.srcOpr, this.srcPort, opr, pid, cid);
    }
    this.srcPort = inp ? "" : pid
    this.srcOpr = inp ? "" : opr
  }

  doCreateConnection(sopr, sport, topr, tport, cid) {
    var con = {
      id: cid,
      src: {
        oid: sopr['id'],
        pid: sport
      },
      tar: {
        oid: topr['id'],
        pid: tport
      }
    }
    this.oFLOW['connections'].push(con)
  }

  doDrawConnection(cid, sid, tid) {
    var that = this
    var src = $("#outport-edit-" + sid).offset();
    var tar = $("#inport-edit-" + tid).offset();
    $(function () {
      src = $("#outport-edit-" + sid).offset();
      tar = $("#inport-edit-" + tid).offset();
  

    console.log("Draw Connection", src, tar);

    var lineGenerator = d3.line()
      .curve(d3.curveBasis);

    var x1 = src.left - 285
    var y1 = src.top - 62
    var x2 = tar.left - 265
    var y2 = tar.top - 62

    var [c1, c2, c3, c4] = that.findCurvature(x1, y1, x2, y2);

    var pathData = "M" + x1 + "," + y1 + " C" + c1 + "," + c2
    pathData = pathData + " " + c3 + "," + c4 + " " + x2 + "," + y2
    //console.log(pathData, x1, y1, x2, y2)
    var lpath = that.svgcontainer.append("path")
      .attr("id", cid)
      .attr("d", pathData)
      .attr("stroke-width", 4)
      .attr("stroke", "black")
      .attr("fill", "none");

    });
  }


  findCurvature(x1, y1, x2, y2) {
    var [c1, c2, c3, c4] = [0.0, 0.0, 0.0, 0.0];
    var [dx, dy, slope, theta] = [0.0, 0.0, 0.0, 0.0]
    dx = x2 - x1
    dy = y2 - y1
    slope = dy / dx
    theta = Math.atan(slope)
    // console.log("slope:", slope);
    // console.log("theta:", theta);
    c1 = x1 + 100
    c2 = y1
    c3 = x1 + 40
    c4 = y2
    return [c1, c2, c3, c4]
  }

  // Open Property
  openModal(id) {
    
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // cant close by clicking outside
    dialogConfig.height = $(document).height();
    dialogConfig.width = $(document).width();
    dialogConfig.data = { 'id': id }
    
    const modalDialog = this.matdialog.open(OprPropertyViewComponent, dialogConfig);

    var that = this
    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    }); 

  
  }




}



// JQUERY Initializer
function jqueryinithandler(oins) {
  $(document).ready(function () {

    var oContainer = d3.select(".svgbox").append("svg").attr("width", "100%").attr("height", "700px");
    console.log("D3", oContainer);
    oins.svgcontainer = oContainer;

    $(document).click(function (e) {
      if ((!e.target.classList.contains("textbox") && !e.target.classList.contains("iconbox") && !e.target.classList.contains("portbox")) && (oins.sSelectedPort !== "")) {
        //console.log("Layout clicked", e.target.classList);
        // oins.doDeSelectItem()
      }
    });

    // key up on anywhere
    $(document).on("keyup", function (e) {
      if (e.keyCode == 8) {
        // oins.doDeleteSelected();
      }
    });
  });
}