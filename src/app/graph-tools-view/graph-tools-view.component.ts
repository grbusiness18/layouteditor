import { Component, OnInit } from '@angular/core';
import { TxnService } from '../services/txn.service';
import { SiblingShareService } from '../services/sibling-share.service';
import * as $ from 'jquery';
declare let $: any;


@Component({
  selector: 'app-graph-tools-view',
  templateUrl: './graph-tools-view.component.html',
  styleUrls: ['./graph-tools-view.component.css']
})
export class GraphToolsViewComponent implements OnInit {
  private metadata: any[] = [];
  private groups: any[] = [];
  private doLoadView: boolean = false;

  constructor(private txn: TxnService, private ss: SiblingShareService) { }

  ngOnInit() {
    this.onGetMetadata();
  }

  ngAfterViewInit() {
    console.log("After View Initialized")
  }

  onGetMetadata() {
    var that = this
    this.txn.getOperatorMetadata().subscribe(data => {
      this.metadata = <any>data;
      this.metadata.forEach(mt => {

        var oGroup = this.groups.filter(g => {
          return g.category === mt.category
        })

        if (oGroup.length > 0) {
          oGroup[0].nodes.push(mt)
        } else {
          this.groups.push({ "category": mt.category, "nodes": [mt] })
        }
      });
      console.log("METADATA:", this.metadata)
      console.log("Groups:", this.groups);
      that.doLoadView = true;
      setTimeout(function () {
        that.doViewStyle();
      }, 100);
    });
  }

  onOperatorClick(id){
    console.log("operator clicked", id);
    var obj = {
      "event": "operatorClick",
      "id" : id
    }
    this.ss.changeMessage(JSON.stringify(obj))
  }



  doViewStyle() {
    /// console.log("After View Init")
    var aNonStyleObj = ["ports", "components", "id", "description", "category"]
    this.groups.forEach((og, ix)=>{
    og.nodes.forEach((el, idx) => {
      //   console.log("Metadata ", idx, Object.keys(el).filter(f => !aNonStyleObj.includes(f)))
      Object.keys(el).filter(f => !aNonStyleObj.includes(f)).forEach(el2 => {
        Object.keys(el[el2]).forEach((prop) => {
          if (el[el2][prop] !== 0 && el[el2][prop] !== "" && el[el2][prop] !== "0") {
            //       console.log("Test", el2, prop, "#" + el2 + "-" + (idx + 1));
            var objid = "#" + el2 + "-" + (ix + 1).toString() + "-" + (idx + 1).toString();
            if (prop === "background-color") {
              (document.querySelector(objid) as HTMLElement).style.backgroundColor = el[el2][prop];
            }

            if (prop === "size") {
              (document.querySelector(objid) as HTMLElement).style.fontSize = el[el2][prop] + "px";
            }

            if (prop === "color") {
              (document.querySelector(objid) as HTMLElement).style.color = el[el2][prop];
            }

            if (prop === "weight" && el2 === "text") {
              (document.querySelector(objid) as HTMLElement).style.fontWeight = el[el2][prop];
            }

            if (prop === "border-size") {
              (document.querySelector(objid) as HTMLElement).style.borderWidth = el[el2][prop] + "px";
              (document.querySelector(objid) as HTMLElement).style.borderStyle = "solid";
            }

            if (prop === "border-color") {
              (document.querySelector(objid) as HTMLElement).style.borderColor = el[el2][prop];
              (document.querySelector(objid) as HTMLElement).style.borderStyle = "solid";
            }
          }
        });
      });
    });
  });
  }


}

function jqueryInitalizer(oINST) {
  var aNonStyleObj = ["ports", "components", "id", "description", "category"]
  oINST.groups.forEach((og, ix)=>{
  og.nodes.forEach((el, idx) => {
    console.log("Metadata ", idx, Object.keys(el).filter(f => !aNonStyleObj.includes(f)))
    Object.keys(el).filter(f => !aNonStyleObj.includes(f)).forEach(el2 => {
      Object.keys(el[el2]).forEach((prop) => {
        if (el[el2][prop] !== 0 && el[el2][prop] !== "" && el[el2][prop] !== "0") {
          console.log("Test", el2, prop, "#" + el2 + "-" + (idx + 1));
          var objid = "#" + el2 +"-"+(ix+1).toString()+ "-" + (idx + 1).toString();
          if (prop === "background-color") {
            $(objid).css("background-color", el[el2][prop]);
          }

          if (prop === "size") {
            $(objid).css("font-size", el[el2][prop] + "px");
          }

          if (prop === "color") {
            $(objid).css("color", el[el2][prop]);
          }

          if (prop === "weight" && el2 === "text") {
            $(objid).css("font-weight", el[el2][prop]);
          }

          if (prop === "border-size") {
            $(objid).css("border-width", el[el2][prop] + "px");
            $(objid).css("border-style", "solid");
          }

          if (prop === "border-color") {
            $(objid).css("border-color", el[el2][prop]);
            $(objid).css("border-style", "solid");
          }
        }
      });
    });
  });
});
}

