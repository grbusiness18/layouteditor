import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import ShortUniqueId from 'short-unique-id';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
};


@Injectable({
  providedIn: 'root'
})
export class TxnService {
  private baseURL = "http://localhost:3000/";
  constructor(private http: HttpClient) {
  }

  createFlow() {
    var url = this.baseURL + 'flows';
    var aFlows = []    
    var oBody = {
      "id" : "flow-"+ new ShortUniqueId().randomUUID(6),
      "operators": [],
      "connections": []      
    }
    return this.http.post(url, oBody, httpOptions);
  }

  getFlows() {
    var url = this.baseURL + 'flows';
    return this.http.get(url, httpOptions);
  }

  getFlowByID(id: string) {
    var url = this.baseURL + 'flows?id=' + id
    return this.http.get(url, httpOptions);
  }

  updateFlow(oFLOW: object){
    console.log("update db:", oFLOW)
    var url = this.baseURL + 'flows?id=' + oFLOW['id'];    
    this.http.delete(url, httpOptions);
    url = this.baseURL + 'flows'
    this.http.post(url, httpOptions, oFLOW);
  }

  getOperatorRuntime(id: string){
    var url = this.baseURL + 'runtime?id=' + id
    return this.http.get(url, httpOptions);
  }

  updateOperatorRuntime(id: string){

  }

  deleteOperatorRuntime(id: string){

  }

  getOperators(){
    var url = this.baseURL + 'operators'
    return this.http.get(url, httpOptions);
  }

  getOperatorByID(id: string){
    var url = this.baseURL + 'operators?id=' + id
    return this.http.get(url, httpOptions);
  }

  getOperatorMetadata(){
    var url = this.baseURL + 'metadata'
    return this.http.get(url, httpOptions);
  }

  getOperatorMetadataByID(id: string){
    var url = this.baseURL + 'metadata?id=' + id
    return this.http.get(url, httpOptions);
  }


  getComponentByID(id: string){
    var url = this.baseURL + 'components?id=' + id
    return this.http.get(url, httpOptions);
  }

}
