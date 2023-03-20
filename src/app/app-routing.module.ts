import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'location', component: LocationTableComponent },
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full'
  },
  {  path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
