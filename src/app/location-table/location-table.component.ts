import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LocationsService } from '../core/locations.service';
import { LocationTableDataSource, LocationTableItem } from './location-table-datasource';

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

  constructor(
    private fb: FormBuilder,
    private locationService: LocationsService
  ) {
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.LF = new FormGroup({
        rows: new FormArray(locations.map(val => new FormGroup({
          name: new FormControl(val.name),
          coordinates: new FormControl(val.coordinates.join(', ')),
          action: new FormControl('existingRecord'),
          isEditable: new FormControl(true),
          isNewRow: new FormControl(false),
        })
        ))
      });
      const formDataSource = (this.LF.get('rows') as FormArray)?.controls;
      this.dataSource = new LocationTableDataSource(formDataSource);
    });
  }

  save(index: string) {
    this.getControl(index).get('isEditable').patchValue(true);
  }

  edit(index: string) {
    this.getControl(index).get('isEditable').patchValue(false);
  }

  cancel(index: string) {
    this.getControl(index).get('isEditable').patchValue(true);
  }


  delete(index: string) {

  }

  getControl(index: string) {
    return (this.LF.get('rows') as any)?.at(index);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
