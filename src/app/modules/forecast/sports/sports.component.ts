import { FootballEntityOrCricketEntityOrGolfEntity } from './../../../interfaces/sports'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Sport } from 'src/app/interfaces/sports'
import { SportsService } from 'src/app/services/sports.service'

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})
export class SportsComponent implements OnInit {
  input: any
  data?: Sport | null
  dataFetched = false

  constructor(
    private sportsService: SportsService,
    private Activatedroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // get the search location
    this.input = this.Activatedroute.snapshot.paramMap.get('id')
    // get sports news for the given location
    this.sportsService.getSports(this.input).subscribe({
      next: (data) => {
        this.data = data
      },
      error: (error: string) => {
        console.log("unable to get sports news. ", error)
      },
      complete: () => {
        this.dataFetched = true
      },
    })
  }
}
