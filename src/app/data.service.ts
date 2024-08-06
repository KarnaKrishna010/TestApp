import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeDetailDTO, EmployeeDetailDTOResponse, EmployeeDTOAdd, EmployeeDTODeletedList, EmployeeDTOEdit, EmployeeDTOList } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private listUrl = 'http://localhost:5227/api/Employee/List';
  private deletedListUrl = 'http://localhost:5227/api/Employee/DeletedList';
  private insertUrl = 'http://localhost:5227/api/Employee/Insert';
  private updateUrl = 'http://localhost:5227/api/Employee/Update';
  private deleteUrl = 'http://localhost:5227/api/Employee/Delete';
  private getByCodeUrl = 'http://localhost:5227/api/Employee/GetByCode';

  constructor(private http: HttpClient) { }

  getEmployeeDTOList(): Observable<EmployeeDTOList[]> {
    return this.http.get<{ dataUpdateResponse: any; employeeDTOList: EmployeeDTOList[] }>(this.listUrl).pipe(
      map(response => response.employeeDTOList)
    );
  }

  getDeletedData(): Observable<EmployeeDTODeletedList[]> {
    return this.http.get<{ dataUpdateResponse: any; employeeDTODeletedList: EmployeeDTODeletedList[] }>(this.deletedListUrl).pipe(
      map(response => response.employeeDTODeletedList)
    );
  }

  addEmployee(newEmployee: EmployeeDTOAdd): Observable<void> {
    return this.http.post<void>(this.insertUrl, newEmployee);
  }

  updateEmployee(updatedEmployee: EmployeeDTOEdit): Observable<EmployeeDTOList> {
    return this.http.post<EmployeeDTOList>(this.updateUrl, updatedEmployee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.post<void>(`${this.deleteUrl}/${id}`,{});
  }

  getEmployeeByCode(employeeId: number): Observable<EmployeeDetailDTOResponse> {
    return this.http.get<EmployeeDetailDTOResponse>(`${this.getByCodeUrl}/` + employeeId);
  }
  
}