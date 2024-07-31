import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EmployeeDTOList } from '../data.model'; // Adjust the import based on your actual DTO
import { UtilsService } from '../utils.service';


@Component({
  selector: 'app-deleted-list',
  templateUrl: './deleted-list.component.html',
  styleUrls: ['./deleted-list.component.css']
})
export class DeletedListComponent implements OnInit {
  deletedEmployees: EmployeeDTOList[] = []; // Array to hold the deleted employees
  filteredData: EmployeeDTOList[] = [];
  data: EmployeeDTOList[] = [];
  cols: any[] = [];

  constructor(
    private dataService: DataService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.loadDeletedEmployees();
    this.setupColumns();
  }

  loadDeletedEmployees(): void {
    this.dataService.getDeletedData().subscribe(
      data => {
        this.deletedEmployees = data;
        console.log(data);
        this.data=data;
        this.filteredData=data;
      },
      error => {
        console.error('Error fetching deleted data:', error);
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

}
