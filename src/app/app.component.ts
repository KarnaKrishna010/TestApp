import { Component, OnInit } from '@angular/core';
import { EmployeeDetailDTO } from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TestApp';
  empId!:EmployeeDetailDTO;
  employeeId!: string;

  ngOnInit(): void {
    this.employeeId='6';
  }

}
