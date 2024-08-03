import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { EmployeeDTOList } from '../data.model';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  minDate: Date | undefined;
  validationMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit numeric validation
      email: ['', [Validators.required, Validators.email]],
      dateOfJoining: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // Numeric validation
    });

    // Subscribe to changes in the dateOfBirth field to update minDate
    this.employeeForm.get('dateOfBirth')?.valueChanges.subscribe(value => {
      if (value) {
        this.updateMinDate(value);
      }
    });
  }

  updateMinDate(dateOfBirth: Date): void {
    const dob = new Date(dateOfBirth);
    const minJoiningDate = new Date(dob);
    minJoiningDate.setFullYear(dob.getFullYear() + 18); // Add 18 years

    this.minDate = minJoiningDate; // Update the minDate for Date of Joining calendar
  }

  onSubmit(): void {
    this.validationMessage = null; // Reset validation message
    this.loading = true;

    if (this.employeeForm.valid) {
      const dob = new Date(this.employeeForm.get('dateOfBirth')?.value);
      const doj = new Date(this.employeeForm.get('dateOfJoining')?.value);

      if (doj < new Date(dob.setFullYear(dob.getFullYear() + 18))) {
        this.validationMessage = 'Date of Joining must be at least 18 years after Date of Birth.';
        this.loading = false;
        return;
      }

      this.dataService.addEmployee(this.employeeForm.value).subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error(error);
        },
        complete: () => {
          timer(1000).subscribe(() => {
            this.router.navigate(['/data-table']);
            this.loading = false;
          });
        }
      });
    }
  }
}
