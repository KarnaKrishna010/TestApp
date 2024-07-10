import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Replacement of HttpClientModule 
import { TableModule } from 'primeng/table'; // Import TableModule from PrimeNG

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule // Include TableModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
