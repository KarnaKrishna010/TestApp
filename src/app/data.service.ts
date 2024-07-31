import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeDTOList } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private listUrl = 'http://localhost:5227/api/Employee/List';
  private deletedListUrl = 'http://localhost:5227/api/Employee/DeletedList';
  private insertUrl = 'http://localhost:5227/api/Employee/Insert';
  private updateUrl = 'http://localhost:5227/api/Employee/Update';
  private deleteUrl = 'http://localhost:5227/api/Employee/Delete';

  constructor(private http: HttpClient) { }

  getEmployeeDTOList(): Observable<EmployeeDTOList[]> {
    return this.http.get<{ dataUpdateResponse: any; employeeDTOList: EmployeeDTOList[] }>(this.listUrl).pipe(
      map(response => response.employeeDTOList)
    );
  }

  getDeletedData(): Observable<EmployeeDTOList[]> {
    return this.http.get<{ dataUpdateResponse: any; employeeDTOList: EmployeeDTOList[] }>(this.deletedListUrl).pipe(
      map(response => response.employeeDTOList)
    );
  }

  addEmployee(newEmployee: EmployeeDTOList): Observable<void> {
    return this.http.post<void>(this.insertUrl, newEmployee);
  }

  updateEmployee(updatedEmployee: EmployeeDTOList): Observable<EmployeeDTOList> {
    return this.http.post<EmployeeDTOList>(this.updateUrl, updatedEmployee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.post<void>(`${this.deleteUrl}/${id}`, {});
  }
}
