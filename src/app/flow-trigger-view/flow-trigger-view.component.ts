import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-flow-trigger-view',
  templateUrl: './flow-trigger-view.component.html',
  styleUrls: ['./flow-trigger-view.component.css']
})
export class FlowTriggerViewComponent implements OnInit {

  private showEvent: Boolean = false;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  onChange(event, isApi) {
    //console.log("Event", event);
    this.showEvent = !isApi;
  }

  onCloseEvent() {
    this.location.back();
  }

  
}
