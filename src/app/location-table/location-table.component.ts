import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LocationsService } from '../core/locations.service';
import { LocationTableDataSource, LocationTableItem } from './location-table-datasource';
import uniqid from 'uniqid';
import { LocationItem } from '../types/IApplicationTypes';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LocationTableItem>;
  dataSource!: LocationTableDataSource;
  // Location Form - LF
  LF!: FormGroup;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'coordinates', 'actions'];
  formState!: LocationItem[];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationsService
  ) {
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.LF = this.fb.group({
        rows: this.fb.array(locations.map(val => new FormGroup({
          id: new FormControl(val.id),
          name: new FormControl(val.name, [Validators.required]),
          coordinates: new FormControl(val.coordinates.join(', '), [Validators.required]),
          isEditable: new FormControl(true),
          isNewRow: new FormControl(false),
        })
        ))
      })
      const formDataSource = (this.LF.get('rows') as FormArray)?.controls;
      this.dataSource = new LocationTableDataSource(formDataSource);
    });
  }

  addItem() {
    const formItem = this.fb.group({
      id: uniqid(),
      name: new FormControl([Validators.required]),
      coordinates: new FormControl([Validators.required]),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
    this.form.insert(0, formItem);
    this.dataSource = new LocationTableDataSource(this.form.controls);
    this.ngAfterViewInit();
  }

  save(index: string) {
    if (this.validateInputs(this.getControl(index))) {
      this.getControl(index).get('isEditable').patchValue(true);

      let { id, name, coordinates, isNewRow } = this.getControl(index).value;
      coordinates = this.cordStrToArr(coordinates);

      if (isNewRow) {
        this.locationService.insertData({ id, name, coordinates });
      } else {
        this.locationService.patchData({ id, name, coordinates });
      }
    }
  }

  edit(index: string) {
    this.disableEdit();
    this.getControl(index).get('isEditable').patchValue(false);
  }

  cancel(index: string) {
    this.getControl(index).get('isEditable').patchValue(true);
    const { name, coordinates } = this.locationService.getLocationByIndex(+index)
    this.getControl(index).get('name').patchValue(name);
    this.getControl(index).get('coordinates').patchValue(coordinates.join(', '));
  }

  delete(index: string) {
    const { id } = this.getControl(index).value;
    this.locationService.deleteData(id);
    this.ngAfterViewInit();
  }

  getControl(index: string) {
    return (this.LF.get('rows') as any)?.at(index);
  }

  disableEdit() {
    this.form.controls.forEach((c) => c.get('isEditable')?.patchValue(true));
  }

  get form() {
    return this.LF.get('rows') as FormArray;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  private cordStrToArr(cordsStr: string) {
    return cordsStr.split(',').map((val: string) => Number(val));
  }

  private validateInputs(control: FormControl) {
    const { name, coordinates } = control.value;
    const checkCords = coordinates.split(',').length;
    let checkCordsNaN = true;
    coordinates.split(',').forEach((val: string) => {
      if (isNaN(Number(val))) {
        alert('Cords are in wrong format');
        checkCordsNaN = false;
      }
    });

    if (name && coordinates && checkCords === 2 && checkCordsNaN) {
      return true;
    }

    return false;
  }
}
