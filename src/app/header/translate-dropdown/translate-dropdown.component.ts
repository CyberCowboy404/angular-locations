import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';

type Language = {
  code: string;
  viewValue: string;
};

@Component({
  selector: 'app-translate-dropdown',
  templateUrl: './translate-dropdown.component.html',
  styleUrls: ['./translate-dropdown.component.scss']
})
export class TranslateDropdownComponent {
  languages: Language[] = [
    { code: 'en', viewValue: 'English' },
    { code: 'ua', viewValue: 'Українська' },
  ];

  selected: Language;

  constructor(private translocoService: TranslocoService) {
    this.selected = this.languages.find(language => language.code === this.translocoService.getActiveLang()) || this.languages[0];
  }

  changeLanguage(language: MatSelectChange) {
    console.log("🚀 ~ file: translate-dropdown.component.ts:19 ~ TranslateDropdownComponent ~ changeLanguage ~ value:", language)
    this.translocoService.setActiveLang(language.value.code);
  }
}
