import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';

import locationsJSON from '../../locations.json';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locationsData$ = new BehaviorSubject(locationsJSON);

  constructor() { }

  getLocations() {
    return this.locationsData$.asObservable();
  }

  updateData(updatedData: any[]): void {
    this.locationsData$.next(updatedData);
  }

}
