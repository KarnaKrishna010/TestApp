import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import {EmployeeDetailDTO } from '../data.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeDetail!: EmployeeDetailDTO;
  errorMessage: string | null = null;
  

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  
  ngOnInit(): void {
    const employeeId = Number(this.route.snapshot.paramMap.get('id')); // Convert to number
    console.log('Employee ID:', employeeId); // Log ID to verify it's correct
    if (employeeId) {
      this.dataService.getEmployeeByCode(employeeId).subscribe({
        next: (data) => {
          this.employeeDetail = data;
          console.log('Employee Data:', this.employeeDetail); // Log the fetched data
        },
        error: (error) => console.error('Error fetching employee details', error)
      });
    } else {
      console.error('Invalid Employee ID');
    }
  }


  formatDate(date:any):string{
    return this.utilsService.formatDate(date);
  }

  formatSalary(value:any):string{
    return this.utilsService.formatSalary(value);
  }
}
