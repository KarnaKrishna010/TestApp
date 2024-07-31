import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { EmployeeDTOList } from '../data.model';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employee!: EmployeeDTOList | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
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
        this.dataService.getEmployeeDTOList().subscribe(data => {
          this.employee = data.find(emp => emp.employeeId == employeeId);
          if (this.employee) {
            this.updateForm(this.employee);
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

  updateForm(employee:EmployeeDTOList): void {
    if (employee) {
      this.employeeForm.patchValue({
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        mobile: employee.mobile,
        email: employee.email,
        dateOfJoining:new Date((employee.dateOfJoining)),
        dateOfBirth: new Date((employee.dateOfBirth)),
        salary: employee.salary
      });
    }
  }

 

  onSubmit(): void {
    console.log(this.employeeForm);
      this.dataService.updateEmployee(this.employeeForm.value).subscribe({
        next : (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.router.navigate(['/data-table']);
        }
      });
  }
}
