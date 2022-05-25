import { Injectable } from '@angular/core'
import { Map } from '../interfaces/map'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(private http: HttpClient) {}

  // get zip code for given geographic location using mapquest api
  getZipCode(input: any) {
    let lat = input[0]
    let long = input[1]
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8',
    )
    return this.http.get<Map>(
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=m6D65lmIwBj5mAy4eQPhHIytEKhCCHMS&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true
    `,
      { headers: headers },
    )
  }

  // get map URL for the updated location using map quest api
  getMapImage(input: any): Observable<Blob> {
    let lat = input[0]
    let long = input[1]
    return this.http.get(
      `https://www.mapquestapi.com/staticmap/v4/getmap?key=m6D65lmIwBj5mAy4eQPhHIytEKhCCHMS&size=300,250&zoom=12&center=${lat},${long}`,
      { responseType: 'blob' },
    )
  }
}
