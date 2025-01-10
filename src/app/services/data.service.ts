import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = '/assets/data/provinces.json';
  private baseUrl = 'https://staging-fha-2024.occamlab.com.sg/api';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getExhibitorCompanies(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/exhibitor-company-list`, {});
  }

  addExhibitor(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-exhibitor`, payload);
  }
}
