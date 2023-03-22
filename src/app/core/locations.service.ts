import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import uniqid from 'uniqid';

import locationsJSON from '../../locations.json';
import { LocationItem } from '../types/IApplicationTypes';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locationsData$!: BehaviorSubject<LocationItem[]>;
  apiLoaded = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.locationsData$ = new BehaviorSubject<LocationItem[]>(locationsJSON.map(l => ({ ...l, id: uniqid() })));
  }

  loadGoogleMapApi() {
    if (!this.apiLoaded.getValue()) {
      const api_key = 'AIzaSyDiJoDX-E_rWftsep3dqtEDZBWjPxo7CwE';

      this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${api_key}`, 'callback').subscribe(() => {
        this.apiLoaded.next(true);
      });
    }
  }

  getLocations() {
    return this.locationsData$.asObservable();
  }

  getLocationByIndex(index: number) {
    return this.locationsData$.getValue()[index];
  }

  updateData(updatedData: LocationItem[]): void {
    this.locationsData$.next(updatedData);
  }

  patchData(updatedData: LocationItem): void {
    const currentData = this.locationsData$.getValue();
    const updatedDataIndex = currentData.findIndex((location) => location.id === updatedData.id);
    currentData[updatedDataIndex] = updatedData;
    this.locationsData$.next(currentData);
  }

  insertData(newData: LocationItem): void {
    const currentData = this.locationsData$.getValue();
    this.locationsData$.next([...currentData, newData]);
  }

  deleteData(id: string): void {
    const currentData = this.locationsData$.getValue();
    const updatedData = currentData.filter((location) => location.id !== id);
    this.locationsData$.next(updatedData);
  }

}
