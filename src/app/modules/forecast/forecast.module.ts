import { NgModule } from '@angular/core'
import { WeatherComponent } from './dashboard/weather/weather.component'
import { MapComponent } from './dashboard/map/map.component'
import { WeekForecastComponent } from './dashboard/week-forecast/week-forecast.component'
import { HourForecastComponent } from './dashboard/hour-forecast/hour-forecast.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ForecastRoutingModule } from './forecast-routing.module'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { CommonModule } from '@angular/common'
import { AlertsSportsComponent } from './dashboard/alerts-sports/alerts-sports.component'
import { NewsComponent } from './news/news.component'
import { SportsComponent } from './sports/sports.component'

@NgModule({
  declarations: [
    WeatherComponent,
    MapComponent,
    WeekForecastComponent,
    HourForecastComponent,
    DashboardComponent,
    AlertsSportsComponent,
    NewsComponent,
    SportsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    ForecastRoutingModule,
    CarouselModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
})
export class ForecastModule {}
