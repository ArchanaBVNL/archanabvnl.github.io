import { Injectable } from '@angular/core'
import { Sport } from '../interfaces/sports'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  public weather: Observable<Sport> = new Observable<Sport>()
  constructor(private http: HttpClient) {}

  // get sports news using weather api
  getSports(input: any) {
    let searchString = this.getSearchString(input)
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8',
    )
    return this.http.get<Sport>(
      `http://api.weatherapi.com/v1/sports.json?key=76dffc8ff43b4529b9614717220204&q=${searchString}`,
      { headers: headers },
    )
  }

  // set search location
  getSearchString(input: any) {
    let searchString = ''

    if (input.length > 1) {
      // lat & lon
      searchString = `${input[0]},${input[1]}`
    } else {
      // location name
      searchString = input[0]
    }
    return searchString
  }
}
