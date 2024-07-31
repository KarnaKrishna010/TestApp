import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { EmployeeDTOList } from '../data.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  data: EmployeeDTOList[] = [];
  filteredData: EmployeeDTOList[] = [];
  cols: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.setupColumns();
    this.resetSearch();
  }

  loadData(): void {
    this.dataService.getEmployeeDTOList().subscribe(
      (response) => {
        console.log('Data loaded:', response);
        this.data = response;
        this.filteredData = [...this.data]; // Initialize filteredData here
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  setupColumns(): void {
    this.cols = [
      { field: 'employeeId', header: 'Employee ID', visible: true },
      { field: 'employeeName', header: 'Employee Name', visible: true },
      { field: 'mobile', header: 'Mobile', visible: true },
      { field: 'email', header: 'Email', visible: true },
      { field: 'dateOfJoining', header: 'Date of Joining', visible: true },
      { field: 'dateOfBirth', header: 'Date of Birth', visible: true },
      { field: 'salary', header: 'Salary', visible: true }
    ];
  }

  formatDate(date:any):string{
    return this.utilsService.formatDate(date);
  }

  formatSalary(value:any):string{
    return this.utilsService.formatSalary(value);
  }


  goToEmployeeList(): void {
    this.loadData(); // Load all data
    this.router.navigate(['/data-table']); // Navigate to the employee list
  }
  

  onEdit(employee: EmployeeDTOList): void {
    console.log('Employee data:', employee);  // Check if EmployeeId is logged correctly here
    console.log('Employee ID:', employee.employeeId);  // Should log the ID or reveal if it's missing
    if (employee && employee.employeeId) {
      this.router.navigate(['/edit-employee', employee.employeeId]);
    } else {
      console.error("Employee ID is undefined or invalid");
    }
  }
  

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.dataService.deleteEmployee(id).subscribe(() => {
        this.loadData(); // Reload data to reflect changes
      });
    }
  }

  navigateToDeletedList() : void {
    this.router.navigate(['/deleted-list']);
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    console.log("Searched term is: " ,searchTerm);

    this.filteredData = this.data.filter(employee => {
      const employeeId = employee.employeeId?.toString().toLowerCase() || '';
      const employeeName = employee.employeeName?.toString().toLowerCase() || '';

      return employeeId.includes(searchTerm) || employeeName.includes(searchTerm);
    }
    )    
    
  }

  resetSearch(): void{
    this.filteredData=[...this.data]; //Resets to full data
  }
}