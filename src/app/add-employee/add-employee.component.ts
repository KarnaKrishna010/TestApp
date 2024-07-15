import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router, //Adding router to constructor
    private utilsService:UtilsService //Injects UtilsService 
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      EmployeeId: ['', Validators.required],
      EmployeeName: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Salary: ['', Validators.required]
    });
  }

  onSubmit(): void { //When the form is submitted, a new employee object is created with a unique ID. The employee is added to the data service, and the user is redirected to the employee list.
    if (this.employeeForm.valid) {
      this.dataService.getDummyData().subscribe(data => {
        const newId = (Math.max(...data.map(e => parseInt(e.id))) + 1).toString();
        const newEmployee: DummyData = {
          id: newId,
          EmployeeId: this.employeeForm.value.EmployeeId,
          EmployeeName: this.employeeForm.value.EmployeeName,
          DateOfJoining: new Date(this.employeeForm.value.DateOfJoining), // Convert to Date
          DateOfBirth: new Date(this.employeeForm.value.DateOfBirth), // Convert to Date
          Salary: this.utilsService.formatSalary(this.employeeForm.value.Salary)
        };
        
        // Add the new employee using the data service
        this.dataService.addEmployee(newEmployee);

        // Navigate back to the employee list
        this.router.navigate(['/data-table']);
      });
    } else {
      this.employeeForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
    }
  }
}
