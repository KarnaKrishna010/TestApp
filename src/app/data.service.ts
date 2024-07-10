import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { DummyData } from './data.model'; // Assuming IDummyData is the interface for your model

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { } //angular's built in service for making HTTP requests 

  getDummyData(): Observable<DummyData[]> { //method uses HTTPClient to make a get request to fetch data from JSON
    return this.http.get<DummyData[]>(this.dataUrl).pipe(
      map((response: any) => response.DummyData)
    ); //returns an Observable of type DummyData[] 
  }
}

//purpose is to fetch data from external sources in our case, data.json file