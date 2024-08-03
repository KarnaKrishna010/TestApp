import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { EmployeeDetailDTOList } from '../data.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeDetail!: EmployeeDetailDTOList;
  errorMessage: string | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('id');
      if (employeeId) {
        this.getEmployeeDetails(employeeId);
      }
    });
  }

  getEmployeeDetails(employeeId: string): void {
    this.dataService.getEmployeeByCode(employeeId).subscribe({
      next: (data) => {
        this.employeeDetail = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching employee details.';
        console.error('Error fetching employee details:', error);
      }
    });
  }

  formatDate(date: Date | string): string {
    // Implement your date formatting logic here
    return new Date(date).toLocaleDateString(); // Example formatting
  }

  formatSalary(value: string): string {
    // Implement your salary formatting logic here
    return `$${parseFloat(value).toFixed(2)}`; // Example formatting
  }
}
