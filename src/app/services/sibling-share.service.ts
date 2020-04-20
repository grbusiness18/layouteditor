import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SiblingShareService {

  private msgSource = new BehaviorSubject<string>('{"default-msg": "default message" }');
  currentMsg = this.msgSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    console.log("Change Msg Event");
    this.msgSource.next(message);
  }
}
