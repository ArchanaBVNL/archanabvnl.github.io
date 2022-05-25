import { Component, Input, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { ForecastService } from 'src/app/services/forecast.service'

@Component({
  selector: 'app-alerts-sports',
  templateUrl: './alerts-sports.component.html',
  styleUrls: ['./alerts-sports.component.css'],
})
export class AlertsSportsComponent implements OnInit {
  alerts: any
  sports: any
  location = ''
  latitude: number = 0
  longitude: number = 0
  flag: boolean = false
  input: any = []
  currentLocation: string = ''

  @Input() searchText!: Subject<string>
  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    // get the updated searched location as current location
    this.searchText.subscribe((v) => {
      this.currentLocation = v
      this.input = [this.currentLocation]
      // get weather forecast for the given location
      this.getForecast()
    })

    // if initial current location is given then find it's coordinates to get the forecast
    if (!this.currentLocation && this.currentLocation !== undefined) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.input = [this.latitude, this.longitude]
        this.getForecast()
      })
    } else {
      // else set it to default current location and get it's forecast
      this.input = [this.currentLocation]
      this.getForecast()
    }
  }

  // set the user location
  setUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.getForecast()
    })
  }

  // get the forecast for the given user location
  getForecast() {
    this.forecastService.getForecast(this.input).subscribe({
      next: (data) => {
        // check if there are any weather alerts for given location 
        if (data.alerts !== undefined && data.alerts.alert !== undefined) {
          this.alerts = data.alerts.alert
        }
      },
      error: (error: string) => {
        console.log('Unable to get weather alert information. ', error)
      },
    })
  }
}
