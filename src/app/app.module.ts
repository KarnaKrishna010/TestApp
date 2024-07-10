import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Replacement of HttpClientModule 
import { TableModule } from 'primeng/table'; // Import TableModule from PrimeNG

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule // Include TableModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
