import { Injectable } from '@angular/core';
import { TxnService } from './txn.service';
import ShortUniqueId from 'short-unique-id';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private flow: any;

  constructor(private txn: TxnService) { }

  doSetFlowData(data: any, doSave:boolean=false){    
    this.flow = <any>data

    if (doSave){
      this.doSaveFlow();
    }

  }

  doGetFlowData(){
    return this.flow
  }

  doSaveFlow(){
    this.txn.updateFlow(this.flow)
  }

  doCreateNewOperator(meta: object) {
    var op = {
      id: new ShortUniqueId().randomUUID(8),
      metadata: meta,
      x: 0,
      y: 0,
      inports: [],
      outports: [],
      components: [],
    }
    console.log("Metadata", meta);
    if (meta['ports']['hasInport'] && meta['ports']['minIP'] > 0) {
      [...Array(meta['ports']['minIP']).keys()].forEach((el) => {
        op.inports.push({
          id: new ShortUniqueId().randomUUID(6),
          type: 'ip',
          name: ''
        })
      });
    }
    if (meta['ports']['hasOutport'] && meta['ports']['minOP'] > 0) {
      [...Array(meta['ports']['minOP']).keys()].forEach((el) => {
        op.outports.push({
          id: new ShortUniqueId().randomUUID(6),
          type: 'op',
          name: ''
        })
      });
    }
    return op
  }


}
