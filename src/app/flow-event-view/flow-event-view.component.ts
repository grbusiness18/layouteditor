import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow-event-view',
  templateUrl: './flow-event-view.component.html',
  styleUrls: ['./flow-event-view.component.css']
})
export class FlowEventViewComponent implements OnInit {

  private daysofweek: any[] = [];
  private months: any[] = [];
  private atdays: any[] = [];

  private showSelMonth: Boolean = false;
  private showSelTime: Boolean = false;
  private showSelDay: Boolean = true;
  private showMonthConfig : string = "0";
  
  constructor() { }

  ngOnInit() {
    // fill days of weeks
    [...Array(7).keys()].forEach(el => {
      this.daysofweek.push({
        key: el,
        value: dayofweekname(el)
      })
    });

    // fill days of weeks
    [...Array(12).keys()].forEach(el => {
      this.months.push({
        key: el,
        value: monthname(el)
      })
    });

    // fill days of weeks
    this.atdays.push({ key: 0, value: "first" });
    this.atdays.push({ key: 1, value: "last" });


  }

  onChange(event, isTime){
    if (isTime){
      this.showSelTime = event['checked'];
    }else{
      this.showSelMonth = event['checked'];      
    }    
  }


  onShowDay(event){
    this.showSelDay = event['checked'];
    console.log("Show Sel day", this.showSelDay )
    if (this.showSelDay){
      this.showMonthConfig = "0";
    }       
  }

  radioChange(event){
    console.log("Radio Change Event")
    this.showSelDay = false;
  }

  valuechange($event) {

  }

}


function dayofweekname(id: number) {
  switch (id) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  }
}


function monthname(id: number) {
  switch (id) {
    case 0: return "January";
    case 1: return "February";
    case 2: return "March";
    case 3: return "April";
    case 4: return "May";
    case 5: return "June";
    case 6: return "July";
    case 7: return "August";
    case 8: return "September";
    case 9: return "October";
    case 10: return "November";
    case 11: return "December";
  }
}
