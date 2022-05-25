import { Component, Input, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { HourEntity } from 'src/app/interfaces/weather'
import { OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-hour-forecast',
  templateUrl: './hour-forecast.component.html',
  styleUrls: ['./hour-forecast.component.css'],
})
export class HourForecastComponent implements OnInit {
  @Input() hourlyData!: Subject<HourEntity>
  @Input() tempUnit!: Subject<string>
  temperatureUnit: string = 'F'
  hourInfo: any = []

  // options for the owl-carousel
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 25,
    autoplay: false,
    lazyLoad: false,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  }

  constructor() {}

  ngOnInit(): void {
    // set hourly weather information
    this.hourlyData.subscribe((v) => {
      this.hourInfo = v
    })
    // set temperature unit - F or C
    this.tempUnit.subscribe((v) => {
      this.temperatureUnit = v
    })
  }
}
