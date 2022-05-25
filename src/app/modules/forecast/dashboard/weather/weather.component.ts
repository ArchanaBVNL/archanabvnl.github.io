import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { ForecastService } from 'src/app/services/forecast.service'
import { MapsService } from 'src/app/services/maps.service'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weather: any
  forecast: any
  location = ''
  latitude: number = 0
  longitude: number = 0
  flag: boolean = false
  input: any = []
  currentLocation: string = ''
  temperatureUnit: string = ''
  heartImage = ''
  heartImagePath = './assets/heart.svg'
  heartFilledImagePath = './assets/heart-fill.svg'

  @Input() searchText!: Subject<string>
  @Input() tempUnit!: Subject<string>
  @Output() favLocationsChanged = new BehaviorSubject<boolean>(false)
  imageUrl: Subject<any> = new Subject()
  imgUrl: any

  @Output() newImageUrl: EventEmitter<string> = new EventEmitter()

  constructor(
    private forecastService: ForecastService,
    private mapsService: MapsService,
  ) {}

  ngOnInit(): void {

    // set user entered search location 
    this.searchText.subscribe((v) => {
      this.currentLocation = v
      this.input = [this.currentLocation]
      // fetch weather info for the location
      this.getWeatherInfo()
    })

    // set temperature unit when changed to F to C or from C to F
    this.tempUnit.subscribe((v) => {
      this.temperatureUnit = v
    })

    // if current location is not set then find the user's current location to get local weather info
    if (!this.currentLocation && this.currentLocation !== undefined) {

      if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        // current location coordinates 
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.input = [this.latitude, this.longitude]
        this.getWeatherInfo()
      })
    } else {
      console.log("Geolocation not available")
    }
    } else {
      this.input = [this.currentLocation]
      this.getWeatherInfo()
    }
  }

  // set the user location by call geolocation
  setUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      // start and current coordinates are same for update 1
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.getWeatherInfo()
    })
  }

  // fetch the weather information for given location
  getWeatherInfo() {
    this.forecastService.getCurrentWeather(this.input).subscribe({
      next: (data) => {
        // read the weather data using forecastService
        this.weather = data
        // set the location name and state
        this.location = `${this.weather.location['name']}, ${this.weather.location['region']}`
        // read the locations stored in the local storage if any
        let locations = JSON.parse(localStorage.getItem('locations') || '[]')
        const filtered = locations.filter(
          (item: string) => item == this.location,
        )
        // if current location is in favorites then color the heart to indicate favorite
        if (filtered.length > 0) {
          this.heartImage = this.heartFilledImagePath
        } else {
          this.heartImage = this.heartImagePath
        }
        // get the image for given coordinates
        this.setImageURL([
          this.weather.location['lat'],
          this.weather.location['lon'],
        ])
      },
      error: (error: string) => {
        console.log("enable to get weather information, ", error)
      },
    })
  }

  // set or unset locations in favorites
  toggleHeartImage() {
    // if the location not already in favorites list 
    if (this.heartImage === this.heartImagePath) {
      // then set it as marked
      this.heartImage = this.heartFilledImagePath
      // add the new location into the local storage favorites list
      let locations = JSON.parse(localStorage.getItem('locations') || '[]')
      locations.push(this.location)
      localStorage.setItem('locations', JSON.stringify(locations))
    } else {
      // if location already in local storage then remove from favorites on user request
      this.heartImage = this.heartImagePath
      let locations = JSON.parse(localStorage.getItem('locations') || '[]')
      const filtered = locations.filter(
        (item: string) => item !== this.location,
      )
      localStorage.setItem('locations', JSON.stringify(filtered))
    }
    this.favLocationsChanged.next(true)
  }

  // set the image url for given location 
  setImageURL(input: any) {
    this.mapsService.getMapImage(input).subscribe({
      // using the mapsService process the blob and retrieve the image URL 
      next: (data: Blob) => {
        var reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = (event) => {
          this.imgUrl = reader.result
          this.newImageUrl.emit(this.imgUrl)
          // update the image URL
          setTimeout(() => this.imageUrl.next(this.imgUrl), 0)
        }
      },
      error: (error: string) => {
        console.log("unable to get Map information, ", error)
      },
    })
  }
}
