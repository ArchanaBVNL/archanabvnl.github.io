import { Component, OnInit } from '@angular/core'
import { ArticlesEntity } from 'src/app/interfaces/news'
import { NewsService } from 'src/app/services/news.service'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  articles?: ArticlesEntity[] | null
  data: any
  dataFetched = false

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {

    // get the current news
    this.newsService.getCurrentNews().subscribe({
      next: (data) => {
        this.data = data
        this.articles = data.articles
      },
      error: (error: string) => {
        console.log("unable to get current news. ", error)
      },
      complete: () => {
        // when complete set flag to true
        this.dataFetched = true
      },
    })
  }
}
