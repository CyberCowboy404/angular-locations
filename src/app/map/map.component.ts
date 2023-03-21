import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApplicationCommonService } from '../core/application-common.service';
import { MatSidenav } from '@angular/material/sidenav';
import { LocationsService } from '../core/locations.service';
import { LocationItem } from '../types/IApplicationTypes';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  apiLoaded: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('drawer')
  drawer!: MatSidenav;
  locations!: LocationItem[];
  center!: google.maps.LatLngLiteral;
  zoom = 10;
  isHandset$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private applicationService: ApplicationCommonService,
    private locationService: LocationsService
  ) {
    const api_key = 'AIzaSyDiJoDX-E_rWftsep3dqtEDZBWjPxo7CwE'
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${api_key}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
      const [lat, lng] = locations[0].coordinates;
      this.center = { lat, lng }
      console.log("🚀 ~ file: map.component.ts:48 ~ MapComponent ~ this.locationService.getLocations ~ this.center:", this.center)
    });
  }

  ngAfterViewInit(): void {
    this.applicationService.sidenavOpened.subscribe(() => {
      this.drawer.toggle();
    });
  }
}
