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
  apiLoaded!: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('drawer')
  drawer!: MatSidenav;
  locations!: LocationItem[];
  center!: google.maps.LatLngLiteral;
  zoom = 10;
  isHandset$: Observable<boolean>;
  currentLocation: LocationItem = { id: '', name: '', coordinates: [0, 0] };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private applicationService: ApplicationCommonService,
    private locationService: LocationsService
  ) {
    this.locationService.loadGoogleMapApi();
    this.apiLoaded = this.locationService.apiLoaded.asObservable();

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  openInfoWindow(marker: MapMarker, location: LocationItem) {
    this.infoWindow.open(marker);
    this.currentLocation = location;
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      const [lat, lng] = locations[0].coordinates;
      this.locations = locations;
      this.center = { lat, lng }
    });
  }

  ngAfterViewInit(): void {
    this.applicationService.sidenavOpened.subscribe(() => {
      this.drawer.toggle();
    });
  }

  ngOnDestroy(): void {

  }
}
