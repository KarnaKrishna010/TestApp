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
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      mobile:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      dateOfJoining: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: DummyData = {
        id: '', // Let API generate the ID if applicable
        employeeId: this.employeeForm.value.employeeId,
        employeeName: this.employeeForm.value.employeeName,
        mobile:this.employeeForm.value.mobile,
        email:this.employeeForm.value.email,
        dateOfJoining: new Date(this.employeeForm.value.dateOfJoining),
        dateOfBirth: new Date(this.employeeForm.value.dateOfBirth),
        salary: this.employeeForm.value.salary 
      };
      
      this.dataService.addEmployee(newEmployee).subscribe(() => {
        this.router.navigate(['/data-table']);
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
  
}