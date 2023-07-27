// product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService} from '../productService'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  username: string | null;
  productList: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient , private productService: ProductService) {
    this.username = null;
  }

  ngOnInit() {
    this.productService.getProductList().subscribe(
      (data) => {
        this.productList = data;
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
  }

  getProductList() {
    const soapRequest = `
      <!-- SOAP Request XML based on your API -->
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wtn="http://www.aspiresoft.co.ke/Wt/">
        <soapenv:Header/>
        <soapenv:Body>
          <wtn:getproductlisting>
            <wtn:UserName>${this.username}</wtn:UserName>
          </wtn:getproductlisting>
        </soapenv:Body>
      </soapenv:Envelope>
    `;


  }
}
