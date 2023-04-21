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

