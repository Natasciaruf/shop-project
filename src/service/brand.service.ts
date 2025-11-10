import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IBrand {
  id: number;
  name: string;
  description: string;
  logo_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = 'http://localhost:3000/brands';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<{ data: IBrand[] }> {
    return this.http.get<{ data: IBrand[] }>(this.apiUrl);
  }

  getBrandById(id: number): Observable<{ data: IBrand }> {
    return this.http.get<{ data: IBrand }>(`${this.apiUrl}/${id}`);
  }

  createBrand(brand: Partial<IBrand>): Observable<IBrand> {
    return this.http.post<IBrand>(this.apiUrl, brand);
  }

  updateBrand(id: number, brand: Partial<IBrand>): Observable<IBrand> {
    return this.http.put<IBrand>(`${this.apiUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
