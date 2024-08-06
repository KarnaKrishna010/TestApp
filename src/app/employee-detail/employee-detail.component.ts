import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { EmployeeDetailDTO } from '../data.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeDetail: EmployeeDetailDTO | null = null;
  errorMessage: string | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = Number(params.get('id')); // Convert to number
      this.loadEmployeeDetails(employeeId);
    });
  }

  private loadEmployeeDetails(employeeId: number): void {
    if (employeeId) {
      this.errorMessage = null; // Clear previous error messages
      this.employeeDetail = null; // Clear previous employee details

      this.dataService.getEmployeeByCode(employeeId).subscribe({
        next: (response) => {
          if (response.employeeDetailDTO) {
            this.employeeDetail = response.employeeDetailDTO; // Set new employee details
            this.errorMessage = null; 
          } else {
            this.errorMessage = 'No data found for the provided ID.';
          }
        },
        error: () => {
          this.errorMessage = 'Error fetching employee details';
        }
      });
    } 
  }

  formatDate(date: any): string {
    return this.utilsService.formatDate(date);
  }

  formatSalary(value: any): string {
    return this.utilsService.formatSalary(value);
  }
}
