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

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.dataService.getDummyData().subscribe(data => {
        const newId = (Math.max(...data.map(e => parseInt(e.id))) + 1).toString();
        const newEmployee: DummyData = {
          id: newId,
          EmployeeId: this.employeeForm.value.EmployeeId,
          EmployeeName: this.employeeForm.value.EmployeeName,
          DateOfJoining: new Date(this.employeeForm.value.DateOfJoining),
          DateOfBirth: new Date(this.employeeForm.value.DateOfBirth),
          Salary: this.utilsService.formatSalary(this.employeeForm.value.Salary)
        };
  
        // Add the new employee using the data service
        this.dataService.addEmployee(newEmployee).subscribe(() => {
          this.router.navigate(['/data-table']);
        });
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
  
}