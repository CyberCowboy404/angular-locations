import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationCommonService {
  sidenavOpened = new Subject<boolean>();

  constructor() { }
}
