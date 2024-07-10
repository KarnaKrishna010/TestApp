import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
    this.setupColumns();
  }

  loadData(): void {
    this.dataService.getDummyData().subscribe(
      (response) => {
        this.data = response.map(item => ({
          ...item,
          DateOfBirth: new Date(item.DateOfBirth), // Convert string to Date object
          DateOfJoining: new Date(item.DateOfJoining) // Convert string to Date object
        }));
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

  formatSalary(value: any): string {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue.toLocaleString('en-US');
      }
    }
    return value.toString();
  }

}
