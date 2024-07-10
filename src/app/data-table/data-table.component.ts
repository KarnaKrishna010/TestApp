import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  data: DummyData[] = [];
  cols: any[] = [];
  employeeForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadData(); // Fetch data from server
    this.setupColumns();
    this.createForm();
  }

  loadData(): void {
    this.dataService.getDummyData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  setupColumns(): void {
    this.cols = [
      { field: 'id', header: 'ID', visible: false },
      { field: 'EmployeeId', header: 'Employee ID', visible: true },
      { field: 'EmployeeName', header: 'Employee Name', visible: true },
      { field: 'DateOfJoining', header: 'Date of Joining', visible: true },
      { field: 'DateOfBirth', header: 'Date of Birth', visible: true },
      {
        field: 'Salary',
        header: 'Employee Salary',
        visible: true,
        formatFunction: (value: any) => {
          return this.formatSalary(value);
        }
      }
    ];
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      EmployeeId: ['', Validators.required],
      EmployeeName: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Salary: ['', Validators.required]
    });
  }
  formatSalary(value: any): string {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue.toLocaleString('en-US');
      }
    }
    return value.toString();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: DummyData = {
        id: (this.data.length + 1).toString(),
        EmployeeId: this.employeeForm.value.EmployeeId,
        EmployeeName: this.employeeForm.value.EmployeeName,
        DateOfJoining: this.employeeForm.value.DateOfJoining,
        DateOfBirth: this.employeeForm.value.DateOfBirth,
        Salary: this.employeeForm.value.Salary
      };

      // Format salary before pushing to data array
      newEmployee.Salary = this.formatSalary(newEmployee.Salary);

      this.data.push(newEmployee);
      this.employeeForm.reset();
    } else {
      this.employeeForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
    }
  }

}
