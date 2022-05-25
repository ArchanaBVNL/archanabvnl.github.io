import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core'
import {  Subject } from 'rxjs'
import { ForecastService } from 'src/app/services/forecast.service'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HourEntity } from 'src/app/interfaces/weather'

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.css'],
})
export class WeekForecastComponent implements OnInit {

  weather: any
  forecast: any
  showAlert = false
  alertType = ''
  alertMessage = ''
  currentTemperature: number = 0
  iconLink: string = ''
  location: string = ''
  condition: string = ''
  feelsLike: string = ''
  humidity: string = ''
  wind: number = 0
  pressure: number = 0
  visibility: number = 0
  latitude: number = 0
  longitude: number = 0
  flag: boolean = false
  input: any = []
  currentLocation: string = ''
  hourlyData: Subject<HourEntity> = new Subject();
  tUnit: Subject<string> = new Subject();

  @Input() searchText!: Subject<string>

  temperatureUnit: string =''
  @Input() tempUnit!: Subject<string>

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 50,
    autoplay:false,
    lazyLoad: false,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
       items: 1
     },
      480: {
       items: 2
     },
      940: {
       items: 3
     }
    },
   nav: false
  }
  

  constructor(
    private forecastService: ForecastService,
  ) {}
  
  ngOnInit(): void {
    
    this.searchText.subscribe((v) => {
      this.currentLocation = v
      this.input = [this.currentLocation]
      this.getForecast()
    })

    this.tempUnit.subscribe((v) => {
      this.temperatureUnit = v
      setTimeout(() => this.tUnit.next(this.temperatureUnit), 0)
    })


    if (!this.currentLocation && this.currentLocation !== undefined) {

      navigator.geolocation.getCurrentPosition((position) => {

        // current location coordinates 
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.input = [this.latitude, this.longitude]
        this.getForecast()
      })
    } else {
      this.input = [this.currentLocation]
      this.getForecast()
    }
  }

  setUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      // start and current coordinates are same for update 1
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.getForecast()
    })
  }

  getForecast() {
    this.forecastService.getForecast(this.input).subscribe({
      next: (data) => {
        this.forecast = data.forecast.forecastday;
        this.updateHourlyData(this.forecast[0]);
      },
      error: (error: string) => {
        this.showAlert = true
        this.alertType = 'error'
        this.alertMessage = 'Unable to get weather info.'
      },
    })
  }

  updateHourlyData(slide:any){
    setTimeout(() => this.hourlyData.next(slide.hour), 0)
  }

  
}
