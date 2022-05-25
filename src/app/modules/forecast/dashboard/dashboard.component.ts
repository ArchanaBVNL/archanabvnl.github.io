import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { BehaviorSubject, Subject } from 'rxjs'
import { MapsService } from 'src/app/services/maps.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  form!: FormGroup
  currentLocation: string = '02215'
  searchLocation: Subject<string> = new Subject()
  imageUrl: Subject<any> = new Subject()
  firstLocation: string = ''

  imgUrl: any
  temperatureUnit: Subject<string> = new Subject()
  tempUnit: string = 'F'
  isFarenheit: any = true
  locations: any = []
  @Input() favLocationsChanged = new BehaviorSubject<boolean>(false)
  @Input() newImageUrl = ''
  renderComponent: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private mapsService: MapsService,
  ) {}

  ngOnInit(): void {
    // clear search input box entries
    this.form = this.formBuilder.group({
      search: [''],
      favLocation: [''],
    })

    // set temperature unit to F or C depending on user selection
    setTimeout(() => this.temperatureUnit.next(this.tempUnit), 0)

    // get the locations from favorites local storage if any
    this.locations = JSON.parse(localStorage.getItem('locations') || '[]')

    // get current position of the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // start coordinates of the user
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let input = [latitude, longitude]
        // set the current zip code of the user
        this.setZipCode(input)
        // get the image URL for the initial location or searched location
        this.setImageURL(input)
        this.renderComponent = true
      })
      
    } else {
      console.log('Geolocation support not available')
    }
  }

  // set the location depending on user search
  public changeLocation() {
    // the user entered location in search box
    this.currentLocation = this.form.controls['search'].value
    // if current location is set then search the requested location
    if (
      this.currentLocation.length > 0 &&
      this.currentLocation != undefined &&
      this.currentLocation != null
    ) {
      setTimeout(() => this.searchLocation.next(this.currentLocation), 0)
    }
  }

  // update favorites depending on users choice
  public changeFavoriteLocation(e: any) {
    // get the current location
    this.currentLocation = e.target.value
    if (this.currentLocation !== 'Favorites') {
      // if location not already in favorites then add to favorites
      setTimeout(() => this.searchLocation.next(this.currentLocation), 0)
    }
  }

  // set temperature unit to F or C
  setTempUnit() {
    if (this.isFarenheit) {
      this.tempUnit = 'C'
    } else {
      this.tempUnit = 'F'
    }
    // update temperature unit
    setTimeout(() => this.temperatureUnit.next(this.tempUnit), 0)
  }

  // get the favorites from the local storage
  fetchItemsFromStorage() {
    this.locations = JSON.parse(localStorage.getItem('locations') || '[]')
  }

  // get the user's current zip code using mapsService
  setZipCode(input: any) {
    this.mapsService.getZipCode(input).subscribe({
      next: (data) => {
        // if a valid location then get the postal code / zip code
        if (data.results != null) {
          if (data.results[0].locations) {
            this.currentLocation = data.results[0].locations[0].postalCode
          }
        }
      },
      error: (error: string) => {
        console.log('Invalid input, Unable to get zip code. ', error)
      },
    })
  }

  // get user location map image URL
  setImageURL(input: any) {
    // call mapsService to get an image URL for the given user location
    this.mapsService.getMapImage(input).subscribe({
      next: (data) => {
        var reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = (event) => {
          this.imgUrl = reader.result
          // set the image url
          setTimeout(() => this.imageUrl.next(this.imgUrl), 0)
        }
      },
      error: (error: string) => {
        console.log("unable to get location map, ", error)
      },
    })
  }

  // update the image url on location change
  updateImageUrl(newUrl: string) {
    this.newImageUrl = newUrl
    setTimeout(() => this.imageUrl.next(this.newImageUrl), 0)
  }
}
