import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './models/data.model';
import {FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  selectedLevel = '';
  data:Array<Object> = [
      {id: 0, name: "Age"},
      {id: 1, name: "State"},
      {id: 2, name: "Tenure"}
  ];
  data1: Observable<Data>;
  countryForm: FormGroup;
  countries = ['State', 'Age', 'Tenure']
  // constructor() {}
  constructor (private httpService: HttpClient, private fb: FormBuilder) { 
    // this.data1 = this.httpService.get<Data>('./assets/data.json');
  }
  labels =  [];
  // OBJECT FOR datasets WITH EMPTY data.
  chartData = [
    {
      label: '1st Year',
      data: [], 
    },
    { 
      label: '2nd Year',
      data: []
    }
   ];

   // CHART COLOR.
   colors = [
    { // 1st Year.
      backgroundColor: 'rgba(30, 16, 224, 0.8)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
   ]
   selected(){
    // console.log(this.selectedLevel);
      this.onLoad(this.selectedLevel["name"]);
    
  }
 
    onLoad(field) {
      this.httpService.get('./assets/count.json', {responseType: 'json'}).subscribe(
        data => {
          let i;
          let label = [];
          let datastate = [];
          for (const key of Object.keys(data["customersAtRiskBy"+field]["customersAtHighRiskBy"+field])) {
            label.push(data["customersAtRiskBy"+field]["customersAtHighRiskBy"+field][key].name)
            datastate.push(data["customersAtRiskBy"+field]["customersAtHighRiskBy"+field][key].count)
        } 
          this.labels = label as any [] ;
          console.log(label) ;
          let datachart = [{"label":"Count","data": datastate}]
          this.chartData = datachart as any [] ;	 // FILL THE CHART ARRAY WITH DATA.
          console.log(datachart)
          // this.countryForm = this.fb.group({
          //   countryControl: ['Canada']
          // });
          },
        (err: HttpErrorResponse) => {
            console.log (err.message);
        }
        );
      }
    ngOnInit () {
        this.onLoad("State"); 
    }
    





  onChartClick(event) {
    console.log(event);
  }
}