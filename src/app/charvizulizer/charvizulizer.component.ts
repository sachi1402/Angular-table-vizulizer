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
