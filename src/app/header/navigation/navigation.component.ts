import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationCommonService } from 'src/app/core/application-common.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(
    private applicationService: ApplicationCommonService,
    private router: Router
  ) { }
  toggleSidenav() {
    this.applicationService.sidenavOpened.next(true);
  }

  checkMapRoute() {
    return this.router.url === '/map';
  }
}
