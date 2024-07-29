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
      Mobile:['',Validators.required],
      Email:['',[Validators.required, Validators.email]],
      DateOfJoining: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: DummyData = {
        id: '', // Let API generate the ID if applicable
        EmployeeId: this.employeeForm.value.EmployeeId,
        EmployeeName: this.employeeForm.value.EmployeeName,
        Mobile:this.employeeForm.value.Mobile,
        Email:this.employeeForm.value.Email,
        DateOfJoining: new Date(this.employeeForm.value.DateOfJoining),
        DateOfBirth: new Date(this.employeeForm.value.DateOfBirth),
        Salary: this.employeeForm.value.Salary 
      };
      
      this.dataService.addEmployee(newEmployee).subscribe(() => {
        this.router.navigate(['/data-table']);
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
  
}