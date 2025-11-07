import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../model/model';

interface IApiResponse<T> {
  data: T;
  pagination?:{
      total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

getProducts(
  page: number = 1,
  limit: number = 10,
  order: string = 'description_asc',
  search: string = '',
  brand: string = '',
): Observable<IApiResponse<IProducts[]>> {
  return this.http.get<IApiResponse<IProducts[]>>(`${this.apiUrl}/backoffice/products`, {
    params: {
      page: page.toString(),
      limit: limit.toString(),
      order,
      search,
      brand,
    }
  });
}

 // get per prendere i prodotti
  // getProducts(): Observable<IApiResponse<products[]>> {
  //   return this.http.get<IApiResponse<products[]>>(`${this.apiUrl}/backoffice/products`);
  // }

//get con id per il singolo prodotto
  getProductByid(id: number): Observable<IApiResponse<IProducts>> {
    console.log('Fetching product with id:', id);
    console.log('Request URL:', `${this.apiUrl}/backoffice/products/${id}`);
    return this.http.get<IApiResponse<IProducts>>(`${this.apiUrl}/backoffice/products/${id}`);
  }

  // post er creare un nuovo prodotto 
  createProduct(newProduct: IProducts): Observable<IApiResponse<IProducts>> {
    return this.http.post<IApiResponse<IProducts>>(`${this.apiUrl}/backoffice/products`, newProduct);
  }

  // put per aggiornare totalmente un prodotto
  updateProduct(id: number, updatedProduct: IProducts): Observable<IApiResponse<IProducts>> {
    return this.http.put<IApiResponse<IProducts>>(`${this.apiUrl}/backoffice/products/${id}`, updatedProduct);
  }

  // patch per aggiornare parzialmente un prodotto
  patchProduct(id: number, partialProduct: Partial<IProducts>): Observable<IApiResponse<IProducts>> {
    return this.http.patch<IApiResponse<IProducts>>(`${this.apiUrl}/backoffice/products/${id}`, partialProduct);
  }

  // delete per eliminare
deleteProduct(id: number) {
  return this.http.delete<{ data: null; message: string }>(
    `http://localhost:3000/backoffice/products/${id}`
  );
}

//get per prendere un prodotto dal brand 
getProductsByBrand(brand: string): Observable<IProducts[]> {
  return this.http.get<IProducts[]>(`http://localhost:3000/backoffice/brands/${brand}`);
}
}
