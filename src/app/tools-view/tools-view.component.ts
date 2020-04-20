import { Component, OnInit } from '@angular/core';
import { SiblingShareService } from '../services/sibling-share.service';
import * as $ from 'jquery';
declare let $: any;

//import { testobj } from '../shared/interface';

import { operatorObject } from '../shared/iObjects';
import { nodeObject, portObject } from '../shared/iObjects';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY } from '@angular/cdk/overlay/typings/overlay-directives';


@Component({
  selector: 'app-tools-view',
  templateUrl: './tools-view.component.html',
  styleUrls: ['./tools-view.component.css']
})
export class ToolsViewComponent implements OnInit {

  ops: operatorObject[];
  message: string;

  constructor(private data: SiblingShareService) { }

  ngOnInit() {
    this.ops = []
    this.doTestData()
  }

  doTestData() {
    this.ops.push({
      "id": "hklad",
      "runtime": {} as portObject,
      "metadata": {
        "operatorType": "",
        "operator": {
          "size": "0",
          "color": "",
          "background-color": "#ffcc00",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "config": {
          "hasInport": true,
          "hasOutport": true,
          "hasIcon": true,
          "hasText": true
        },
        "iconbox": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "fa fa-code",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "textbox": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "bold",
          "value": "Test Text",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "inport": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "outport": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "connection": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "property": {
          "codeEditor": {
            "enabled": true,
            "language": "javascript",
            "showToolBar": false,
            "showUploadSave": true
          },
          "portConfig": {
            "enabled": false,
            "showInportExt": false,
            "showOutportExt": false,
            "maxPorts": 16,
            "maxConnectionsPerPort": 10
          },
          "apperanceConfig": {
            "enabled": true,
            "showLabelConfig": false,
            "showIconConfig": false,
            "showMarkdownEditor": true
          }
        }
      }
    },
    {
      "id": "hkladasa",
      "runtime": {} as portObject,
      "metadata": {
        "operatorType": "",
        "operator": {
          "size": "0",
          "color": "",
          "background-color": "#ffcc00",
          "weight": "",
          "value": "",
          "border-size": "10",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "config": {
          "hasInport": true,
          "hasOutport": false,
          "hasIcon": true,
          "hasText": true
        },
        "iconbox": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "fa fa-code",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "textbox": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "Test Text",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "inport": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "outport": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "connection": {
          "size": "0",
          "color": "",
          "background-color": "",
          "weight": "",
          "value": "",
          "border-size": "",
          "border-color": "",
          "height": "0",
          "width": "0"
        },
        "property": {
          "codeEditor": {
            "enabled": false,
            "language": "",
            "showToolBar": false,
            "showUploadSave": false
          },
          "portConfig": {
            "enabled": false,
            "showInportExt": false,
            "showOutportExt": false,
            "maxPorts": 16,
            "maxConnectionsPerPort": 10
          },
          "apperanceConfig": {
            "enabled": false,
            "showLabelConfig": false,
            "showIconConfig": false,
            "showMarkdownEditor": false
          }
        }
      }
    }
    )
  }

  ngAfterViewInit() {
    var aNonStyleObj = ["operatorType", "property", "config", "connection"]
    this.ops.forEach((el, idx) => {
      console.log("Metadata ", idx, Object.keys(el.metadata).filter(f => !aNonStyleObj.includes(f)))
      Object.keys(el.metadata).filter(f => !aNonStyleObj.includes(f)).forEach(el2 => {
        Object.keys(el.metadata[el2]).forEach((prop) => {
          if (el.metadata[el2][prop] !== 0 && el.metadata[el2][prop] !== "" && el.metadata[el2][prop] !== "0") {
            console.log("Test", el2, prop, "#" + el2 + "-" + (idx + 1));            
            var objid = "#" + el2 + "-" + (idx + 1).toString() ;
            if (prop === "background-color"){              
              (document.querySelector(objid) as HTMLElement).style.backgroundColor = el.metadata[el2][prop];
            }

            if (prop === "size"){              
              (document.querySelector(objid) as HTMLElement).style.fontSize = el.metadata[el2][prop];
            }

            if (prop === "color"){              
              (document.querySelector(objid) as HTMLElement).style.color = el.metadata[el2][prop];
            }

            if (prop === "weight" && el2 === "text"){              
              (document.querySelector(objid) as HTMLElement).style.fontWeight = el.metadata[el2][prop];
            }

            if (prop === "border-size"){              
              (document.querySelector(objid) as HTMLElement).style.borderWidth = el.metadata[el2][prop];
              (document.querySelector(objid) as HTMLElement).style.borderStyle = "solid";
            }

            if (prop === "border-color"){              
              (document.querySelector(objid) as HTMLElement).style.borderColor = el.metadata[el2][prop];
              (document.querySelector(objid) as HTMLElement).style.borderStyle = "solid";
            }
          }
        });
      });
    });
  }

  onToolButton(idx) {
    console.log("Button Clicked");    
    this.data.changeMessage(JSON.stringify(this.ops[idx]));
  }
}
