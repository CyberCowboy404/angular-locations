import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-translate-dropdown',
  templateUrl: './translate-dropdown.component.html',
  styleUrls: ['./translate-dropdown.component.scss']
})
export class TranslateDropdownComponent {
  constructor(private translocoService: TranslocoService) {
    translocoService.setActiveLang('ua');
  }
}
