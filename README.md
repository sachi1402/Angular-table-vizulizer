A) Visualize JSON data via HTML table using Angular

	HTML ⬇️
<!-- <div  *ngFor="let emp of EmployeList? EmployeList : []">{{emp.Id}}</div> -->


<div class="table-container mat-elevation-z8">
<table mat-table [dataSource]="EmployeListsorted? EmployeListsorted : []" class="mat-elevation-z8">
    <ng-container matColumnDef="EmployeeName">
      <th mat-header-cell *matHeaderCellDef> Employee Name </th>
      <td mat-cell *matCellDef="let element"  > {{element.EmployeeName}} </td>
     
    </ng-container>
 
    <ng-container matColumnDef="StarTimeUtc">
      <th mat-header-cell *matHeaderCellDef> Start Time </th>
      <td mat-cell *matCellDef="let element"> {{element.StarTimeUtc}} </td>
    </ng-container>
 
    <ng-container matColumnDef="EndTimeUtc">
      <th mat-header-cell *matHeaderCellDef> End Time </th>
      <td mat-cell *matCellDef="let element"> {{element.EndTimeUtc}} </td>
    </ng-container>
 
    <ng-container matColumnDef="EntryNotes">
      <th mat-header-cell *matHeaderCellDef> Entry Notes </th>
      <td mat-cell *matCellDef="let element"> {{element.EntryNotes}} </td>
    </ng-container>


    <ng-container matColumnDef="Total Time">
        <th mat-header-cell *matHeaderCellDef> Total Time </th>
        <td mat-cell *matCellDef="let element" > {{element.TotalTime}} </td>
      </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns" ></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="gettime(row.StarTimeUtc,row.EndTimeUtc)"  [ngStyle]="{'background-color': getTimeColor(row)}" ></tr>
  </table>
 
</div>
<mat-toolbar >
    <h1>Click On Any Row To See Pi-Chart </h1>
    <p>  ➡️ b) Visualize JSON data in a PIE Chart using Angular ⬇️</p>
  </mat-toolbar>
<div class="section2 m-4 p-3" *ngIf="ChartStartTime !== undefined ">
<app-charvizulizer
[startTime]="ChartStartTime"
[endTime]="ChartEndTime">
</app-charvizulizer>
</div>




Type script component  ⬇️

import { Component, OnChanges, OnInit ,SimpleChanges,ViewChild} from '@angular/core';
import { EmpdataService } from '../empdata.service';
import { Employee } from './employee';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-tablevizulization',
  templateUrl: './tablevizulization.component.html',
  styleUrls: ['./tablevizulization.component.scss'],




})
export class TablevizulizationComponent implements OnInit {
  EmployeList: any;
  EmployeListsorted: any;
  displayedColumns: string[] = ['EmployeeName', 'StarTimeUtc', 'EndTimeUtc', 'EntryNotes','Total Time'];
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private empservice: EmpdataService) { }


  ngOnInit() {
    this.loadEmplyes();
  }
   
  loadEmplyes() {
    this.empservice.getemployeList().subscribe(data => {
      this.EmployeList = data;
      this.sortedEmplyelist();
    });
  }


  sortedEmplyelist() {
    this.EmployeListsorted = this.EmployeList.map((employee: any) => ({
      ...employee,
      TotalTime: this.calculateTotalTime(employee.StarTimeUtc, employee.EndTimeUtc).timestr,
      TotalTimeNumber: this.calculateTotalTime(employee.StarTimeUtc, employee.EndTimeUtc).timenum
    }));


    // Set the default sort order to be descending by TotalTime
    this.EmployeListsorted.sort = this.sort;
    this.sort.sort({ id: 'TotalTime', start: 'desc', disableClear: false });
  }


  calculateTotalTime(startTime: string, endTime: string): {
    timestr: string;
    timenum: number;
  } {
    // Parse the start and end times into Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);


    // Calculate the total time difference in milliseconds
    const diffMs = end.getTime() - start.getTime();


    // Convert the total time difference back to a string in the format "HH:mm:ss"
    const diffSecs = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSecs / 3600);
    const minutes = Math.floor((diffSecs % 3600) / 60);
    const seconds = diffSecs % 60;
    return { timestr: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
              timenum: hours+minutes+seconds
  };}
 
  getTimeColor(employee: any) {
    const totalTime = new Date(employee.EndTimeUtc).getTime() - new Date(employee.StarTimeUtc ).getTime();
   
    if (totalTime < 36*100000) {
      return '#e53935'; // red
    } else if (totalTime < 36*100000 *2) {
      return '#ffb74d'; // orange
    } else {
      return '#8bc34a'; // green
    }
  }
  ChartStartTime : string |undefined;
  ChartEndTime: string |undefined;


 
  gettime(start:string,end:string) {
   
    this.ChartStartTime = start;
    this.ChartEndTime = end;
 
  }
}





SCREENSHOT OF TASK A ⬇️


B) Visualize JSON data in a PIE Chart using Angular
HTML ⬇️
	
<div class="contaner m-4 p-3" >
    <!-- <div style="position:absolute;">  -->
       
        <canvas id = "myChart"></canvas>
    <!-- </div> -->
</div>

Type script component  ⬇️
import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-charvizulizer',
  templateUrl: './charvizulizer.component.html',
  styleUrls: ['./charvizulizer.component.scss']
})
export class ChartVisualizerComponent {
  @Input() startTime: string | undefined;
  @Input() endTime: string | undefined;
  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  myChart: any;


  ngOnInit() {
    this.piseter()
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['startTime'] || changes['endTime']) {
      this.piseter();
    }
  }
 
  piseter(){
    if (!this.startTime || !this.endTime) {
      return;
    }
    const start = new Date(this.startTime);
    const end = new Date(this.endTime);
    const diff = end.getTime() - start.getTime();
    const hours = diff / (1000 * 60 * 60);
    const percentage = (hours / 24) * 100;


 
    this.chartData.push(percentage);
    this.chartData.push(100 - percentage);
   
    this.chartDatalabels.push('Hours Worked');
    this.chartDatalabels.push('Hours Remaining');
   
    this.ctx = document.getElementById('myChart');
   
    this.config = {
      type: 'pie',
      options: {},
      data: {
        labels: this.chartDatalabels.slice(-2),
        datasets: [{
          label: 'Chart Data',
          data: this.chartData.slice(-2),
          borderWidth: 5,
          borderColor: 'grey',
          backgroundColor: [ '#8bc34a','#e53935'] // two colors for the pie chart
        }],
      }
    }
    // const myChart = new Chart(this.ctx, this.config);
    if (this.myChart) {
      // If chart already exists, update it with new data
      // console.log(this.myChart);
      this.myChart.data = this.config.data;
      this.myChart.update();
    } else {
      // Otherwise, create new chart
      this.myChart = new Chart(this.ctx, this.config);
    }
  }
 
}




SCREENSHOT OF TASK B ⬇️


The pie chart changes dynamically if clicked on table row

