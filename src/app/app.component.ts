import { Component, OnInit } from '@angular/core';
import { EmployeeDetailDTOList } from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TestApp';
  empId:EmployeeDetailDTOList | undefined;
  employeeId: string | undefined;

  ngOnInit(): void {
    this.employeeId='6';
  }

}
