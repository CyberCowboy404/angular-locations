import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApplicationCommonService } from '../core/application-common.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  apiLoaded: Observable<boolean>;
  @ViewChild('drawer')
  drawer!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private httpClient: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private applicationService: ApplicationCommonService
  ) {
    const api_key = 'AIzaSyDiJoDX-E_rWftsep3dqtEDZBWjPxo7CwE'
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${api_key}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngAfterViewInit(): void {
    this.applicationService.sidenavOpened.subscribe(() => {
      this.drawer.toggle();
    });
  }
}
