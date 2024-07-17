import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  employee!: DummyData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { //subscribes to the changes in the path parameter, uses ActivatedRoute service 
      const id = params['id']; //retrives the ID from the URL 
      this.dataService.getDummyData().subscribe(data => {  //fetches dummy data
        this.employee = data.find(emp => emp.id === id)!; //searches for an employee id whose matches the provided id, ! operator indicates the result to be not null 
        this.createForm(); //if the employee is found create the form 
      });
    });
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      id: [{ value: this.employee.id, disabled: true }],
      EmployeeId: [this.employee.EmployeeId, Validators.required],
      EmployeeName: [this.employee.EmployeeName, Validators.required],
      DateOfJoining: [this.employee.DateOfJoining, Validators.required],
      DateOfBirth: [this.employee.DateOfBirth, Validators.required],
      Salary: [this.employee.Salary, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: DummyData = {
        ...this.employee,
        EmployeeId: this.employeeForm.value.EmployeeId,
        EmployeeName: this.employeeForm.value.EmployeeName,
        DateOfJoining: new Date(this.employeeForm.value.DateOfJoining),
        DateOfBirth: new Date(this.employeeForm.value.DateOfBirth),
        Salary: this.utilsService.formatSalary(this.employeeForm.value.Salary)
      };

      this.dataService.updateEmployee(updatedEmployee).subscribe(() => {
        this.router.navigate(['/data-table']);
      });
    }
  }
}