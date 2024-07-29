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
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.dataService.getDummyData().subscribe(data => {
        this.employee = data.find(emp => emp.id === id)!;
        if (this.employee) {
          this.createForm();
        }
      });
    });
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      employeeId: [this.employee.EmployeeId, Validators.required],
      employeeName: [this.employee.EmployeeName, Validators.required],
      mobile:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      dateOfJoining: [new Date(this.employee.DateOfJoining), Validators.required],
      dateOfBirth: [new Date(this.employee.DateOfBirth), Validators.required],
      salary: [this.employee.Salary, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: DummyData = {
        ...this.employee,
        EmployeeId: this.employeeForm.value.EmployeeId,
        EmployeeName: this.employeeForm.value.EmployeeName,
        Mobile:this.employeeForm.value.Mobile,
        Email:this.employeeForm.value.Email,
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
