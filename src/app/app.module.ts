import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Replacement of HttpClientModule 
import { TableModule } from 'primeng/table'; // Import TableModule from PrimeNG
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DeletedListComponent } from './deleted-list/deleted-list.component';
import { LoaderComponent } from './loader/loader.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DeletedListComponent,
    LoaderComponent,
    EmployeeDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule // Include TableModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }