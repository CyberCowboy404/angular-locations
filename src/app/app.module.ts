import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { TranslateDropdownComponent } from './header/translate-dropdown/translate-dropdown.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

// Material modules
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LocationTableComponent } from './location-table/location-table.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NavigationComponent,
    TranslateDropdownComponent,
    LocationTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    // Material modules
    MatToolbarModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
