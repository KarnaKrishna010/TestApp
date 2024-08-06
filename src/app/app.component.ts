import { Component, OnInit } from '@angular/core';
import { EmployeeDetailDTO } from './data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TestApp';
  empId!:EmployeeDetailDTO;
  employeeId: string = '';
  errorMessage: string | null=null;

  constructor(private router:Router) {}

  ngOnInit(): void {}

  viewEmployeeDetails() : void {
    if (this.employeeId) {
      this.router.navigate(['employee-detail',this.employeeId]);
    } else {
      console.error('Please enter a valid Employee ID');
    }
  }

}