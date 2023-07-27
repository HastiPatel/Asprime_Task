import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
   headers = new HttpHeaders()
  .set('Content-Type', 'text/xml')
  .set('Authorization', 'barrear token WebAuth1234');

  getProductList() {
    return this.http.get<any[]>('https://www.aspiresoft.co.ke/Wt/APIs.aspx/getproductlisting').pipe(
      map((response) => response) 
    );
  }
  addProduct() {
    return this.http.post<any[]>('https://www.aspiresoft.co.ke/Wt/APIs.aspx/additem',  { Headers, }).pipe(
      map((response) => response) 
    );
  }
}
