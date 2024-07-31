import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { EmployeeDTOList } from '../data.model';

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
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      mobile:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      dateOfJoining: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm);
      this.dataService.addEmployee(this.employeeForm.value).subscribe({
        next : (response) => {
          console.log(response);
        },
        error : (error) => {
          console.error(error);
        },
        complete : () =>
        {
          this.router.navigate(['/data-table']);
        }
      });
  }
  
}