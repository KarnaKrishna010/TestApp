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
  employee!: DummyData | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    // Initialize form with default values to avoid errors
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfJoining: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

    this.route.params.subscribe(params => {
      const employeeId = params['id'];
      if (employeeId) {
        this.dataService.getDummyData().subscribe(data => {
          
          this.employee = data.find(emp => emp.employeeId == employeeId);
          if (this.employee) {
            this.updateForm();
          } else {
            console.error('Employee not found');
          }
        }, error => {
          console.error('Error fetching data:', error);
        });
      } else {
        console.error('No employee ID provided');
      }
    });
  }

  updateForm(): void {
    if (this.employee) {
      this.employeeForm.patchValue({
        employeeId: this.employee.employeeId,
        employeeName: this.employee.employeeName,
        mobile: this.employee.mobile,
        email: this.employee.email,
        dateOfJoining:this.formatDate(this.employee.dateOfJoining),
        dateOfBirth: this.formatDate(this.employee.dateOfBirth),
        salary: this.employee.salary
      });
    }
  }

  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return '';
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: DummyData = {
        ...this.employee!,
        ...this.employeeForm.value,
        dateOfJoining: new Date(this.employeeForm.value.dateOfJoining),
        dateOfBirth: new Date(this.employeeForm.value.dateOfBirth),
        salary: this.utilsService.formatSalary(this.employeeForm.value.salary) // Apply formatting if needed
      };

      this.dataService.updateEmployee(updatedEmployee).subscribe(() => {
        this.router.navigate(['/data-table']);
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
