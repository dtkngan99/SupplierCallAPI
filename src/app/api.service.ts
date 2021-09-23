import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSupplier } from './supplier.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) {}

  getSupplier(pageIndex?: number, pageSize?: number, name?: string):Observable<ResponseSupplier> {
    return this.httpClient.get<ResponseSupplier>(this.apiURL+'Supplier',
      {
        params: {
          pageSize: `${pageSize || ''}`,
          pageIndex: `${pageIndex || ''}`
        }
      });
  }



}
