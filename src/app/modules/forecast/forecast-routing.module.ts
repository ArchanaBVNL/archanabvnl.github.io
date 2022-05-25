import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { NewsComponent } from './news/news.component'
import { SportsComponent } from './sports/sports.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'news', component: NewsComponent },
      { path: 'sports/:id', component: SportsComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastRoutingModule {}
