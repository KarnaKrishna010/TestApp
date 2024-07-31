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
  }

  loadDeletedEmployees(): void {
    this.dataService.getDeletedData().subscribe(
      data => {
        this.deletedEmployees = data;
      },
      error => {
        console.error('Error fetching deleted data:', error);
      }
    );
  }

  formatDate(date:any):string{
    return this.utilsService.formatDate(date);
  }

  formatSalary(value:any):string{
    return this.utilsService.formatSalary(value);
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredData = this.data.filter(employee =>
      employee.employeeId.toLowerCase().includes(searchTerm) ||
      employee.employeeName.toLowerCase().includes(searchTerm)
    );
  }

}
