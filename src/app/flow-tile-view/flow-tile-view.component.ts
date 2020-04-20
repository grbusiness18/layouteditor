import { Component, OnInit } from '@angular/core';
import { TxnService } from '../services/txn.service';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flow-tile-view',
  templateUrl: './flow-tile-view.component.html',
  styleUrls: ['./flow-tile-view.component.css']
})
export class FlowTileViewComponent implements OnInit {

  private FLOWS: any[] = [];
  private showTiles: boolean = false;

  constructor(private txn: TxnService,
      private util: UtilService,
      private router: Router ) { }

  ngOnInit() {
    this.util.doSetFlowData({});
    this.onGetFlows();
  }

  onGetFlows(){
  
    this.txn.getFlows().subscribe(data=>{
      console.log("Flows:", data)
      this.FLOWS = <any>data
      this.showTiles = true
    });
    
    
    /*
    
    
    [...Array(10).keys()].forEach(el=>{
      this.FLOWS.push({
        id: "flow-"+el,
        description: "Generated Description of Text: " + el.toString() 
      })
    })
    this.showTiles = true;
    */
    
    console.log("Flows:", this.FLOWS);
  }

  onFlowClick(oflow: object){
    this.util.doSetFlowData(oflow);
    console.log("Flow Click", oflow)
    this.router.navigate(['/flow', oflow['id'], 'editor']);
  }

  onFlowDblClick(oflow: object){
    //this.util.doSetFlowData(oflow);
    //console.log("Flow Click", oflow)
    this.router.navigate(['/flow', oflow['id'], 'settings']);
  }

  onAddNewFlow(){
    this.FLOWS.push({
      id: "flow-"+ this.FLOWS.length,
      description: "Generated Description of Text: " + this.FLOWS.length 
    })
  }


}
