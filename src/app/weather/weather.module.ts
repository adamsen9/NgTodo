import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WeatherDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
