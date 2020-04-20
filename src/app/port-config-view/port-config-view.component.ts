import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ShortUniqueId from 'short-unique-id';

@Component({
  selector: 'app-port-config-view',
  templateUrl: './port-config-view.component.html',
  styleUrls: ['./port-config-view.component.css']
})
export class PortConfigViewComponent implements OnInit {
  @Input() data = {} as any;
  //@Output() portConfigEvent = new EventEmitter<string>();

  outports: any[] = []
  inports: any[] = []


  constructor() {

  }

  ngOnInit() {
    console.log("Port Config", this.data);
    this.inports = [].concat(this.data['inports'])
    this.outports = [].concat(this.data['outports'])
  }

  valuechange(event) {
    if (event.target.value <= 0) {
      return 0
    }

    if (event.target.id.includes("outport")) {
      if (event.target.value > this.outports.length) {
        this.doIncrease("op")
      } else {
        this.doDecrease("op")
      }
    }

    if (event.target.id.includes("inport")) {
      if (event.target.value > this.inports.length) {
        this.doIncrease("ip")
      } else {
        this.doDecrease("ip")
      }
    }
  }

  doDecrease(ptype) {
    if (ptype === "ip") {
      this.inports.pop()
    } else {
      this.outports.pop();
    }
  }

  doIncrease(ptype) {
    this.onCreatePort(ptype);
  }

  onCreatePort(ptype) {
  
    var oport ={
      id: new ShortUniqueId().randomUUID(6),
      type: 'ip',
      name: ''
    };

    if (ptype === "ip") {
      this.inports.push(oport)
    } else {
      oport['type'] = 'op'
      this.outports.push(oport)
    }
  }

  onDeletePort(i, ptype) {

    if (ptype === "ip") {
      this.inports.splice(i, 1);
    } else {
      this.outports.splice(i, 1);
    }
  }
}
