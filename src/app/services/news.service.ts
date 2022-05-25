import { Injectable } from '@angular/core'
import { News } from '../interfaces/news'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public news: Observable<News> = new Observable<News>()

  constructor(private http: HttpClient) {}

  // get current news using news catcher api
  getCurrentNews() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '8eQpDmawqhNkUZ6ln9AOe3yGkKZ2QK4KB6zWfSLs1vE',
    })

    return this.http.get<News>(
      `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&when=1h&lang=en`,
      { headers: headers, withCredentials: true },
    )
  }
}
