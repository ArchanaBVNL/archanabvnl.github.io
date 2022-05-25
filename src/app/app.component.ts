import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CS701-TermProject-Bhogaraju'
  searchKey: any

  userLocation: string = ''
  constructor() {}

  public ngOnInit() {}
}
