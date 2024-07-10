import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';

interface Column{
  field:string;
  header:string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  data: DummyData[] = [];

  cols!:Column[];

  constructor(private dataService: DataService) { } //injected to fetch data from data.service.ts 

  ngOnInit(): void { //fetches data during initialization ngOnInit() 
    this.dataService.getDummyData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  
   this.cols=[
    {field:'id',header:'ID'}, //Hide ID column to user 
    {field:'EmployeeId',header:'Employee ID'},
    {field:'EmployeeName',header:'Employee Name'},
    {field:'DateOfJoining',header:'Date of Joining'},
    {field:'DateOfBirth',header:'Date of Birth'},
    {field:'Salary',header:'Employee Salary'}
   ]; 
  }
  
}

//Angular component responsible for displaying data fetched from the service.
