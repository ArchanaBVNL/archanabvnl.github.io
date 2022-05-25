import { Injectable } from '@angular/core'
import { Weather } from '../interfaces/weather'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  public weather: Observable<Weather> = new Observable<Weather>()
  constructor(private http: HttpClient) {}

  // call weather api to get current weather information for given location
  getCurrentWeather(input: any) {
    let searchString = this.getSearchString(input)
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8',
    )
    return this.http.get<Weather>(
      `https://api.weatherapi.com/v1/current.json?key=76dffc8ff43b4529b9614717220204&q=${searchString}&aqi=no`,
      { headers: headers },
    )
  }

  // get weather forecast for given input location
  getForecast(input: any) {
    let searchString = this.getSearchString(input)
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8',
    )
    return this.http.get<Weather>(
      `https://api.weatherapi.com/v1/forecast.json?key=76dffc8ff43b4529b9614717220204&q=${searchString}&days=3&aqi=no&alerts=yes`,
      { headers: headers },
    )
  }

  // set lat & lon coordinates or location name as search parameter
  getSearchString(input: any) {
    let searchString = ''
    if (input.length > 1) {
      searchString = `${input[0]},${input[1]}`
    } else {
      searchString = input[0]
    }
    return searchString
  }
}
