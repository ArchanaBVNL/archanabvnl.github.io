import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const forecastModule = () => import('./modules/forecast/forecast.module').then(x => x.ForecastModule);


const routes: Routes = [
  { path: '', loadChildren: forecastModule }, // default module loaded on index.html
  { path: 'forecast', loadChildren: forecastModule }, // lazy load forecast module when path is /forecast

  // if path not found, redirect to /courses
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
