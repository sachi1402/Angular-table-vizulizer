import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablevizulizationComponent } from './tablevizulization/tablevizulization.component';

import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { ChartVisualizerComponent } from './charvizulizer/charvizulizer.component';


import {Chart} from 'chart.js';
import { registerables } from 'chart.js';

import {MatToolbarModule} from '@angular/material/toolbar';

Chart.register(...registerables);
@NgModule({
  declarations: [
    AppComponent,
    TablevizulizationComponent,
    ChartVisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatTableModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
