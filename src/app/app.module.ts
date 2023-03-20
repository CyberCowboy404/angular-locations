import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { TranslateDropdownComponent } from './header/translate-dropdown/translate-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material modules
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationTableComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NavigationComponent,
    TranslateDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    // Material modules
    MatToolbarModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
