import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private httpService: HttpClient) { }

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
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
   ]
  
    ngOnInit () {
        this.httpService.get('./assets/count.json', {responseType: 'json'}).subscribe(
        data => {
          let i;
          let label = [];
          let datastate = [];
          for (const key of Object.keys(data['customersAtRiskByState']['customersAtHighRiskByState'])) {
            label.push(data['customersAtRiskByState']['customersAtHighRiskByState'][key].name)
            datastate.push(data['customersAtRiskByState']['customersAtHighRiskByState'][key].count)
        } 
          this.labels = label as any [] ;
          console.log(label) ;
          let datachart = [{"label":"Count","data": datastate}]
          this.chartData = datachart as any [] ;	 // FILL THE CHART ARRAY WITH DATA.
          console.log(datachart)
          },
        (err: HttpErrorResponse) => {
            console.log (err.message);
        }
        );
    }

  onChartClick(event) {
    console.log(event);
  }
}