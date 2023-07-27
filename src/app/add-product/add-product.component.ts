import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  username: string | null;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient ,  private router: Router) {
    this.username = localStorage.getItem('username')
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      ItemCode: ['', Validators.compose([Validators.minLength(6), Validators.pattern(/^(1[1-9][0-9]{4}|[2-9][0-9]{4}|[1-9][0-9]{5})$/)])],
      user: [this.username, Validators.required ],
      Photo: ['https://images.hindustantimes.com/tech/htmobile4/P35953/heroimage/143993-v4-apple-iphone-14-mobile-phone-large-1.jpg', Validators.required],
      Description: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
      Packaging: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      Unit: [1, Validators.compose([Validators.required, Validators.maxLength(50)])],
    });
  }

  get f() { return this.productForm.controls; }

  ngOnInit() {
  }
 
  addProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;
    const userName = productData.user;
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wtn="http://www.aspiresoft.co.ke/Wt/">
        <soapenv:Header/>
        <soapenv:Body>
          <wtn:additem>
            <wtn:name>${productData.name}</wtn:name>
            <wtn:ItemCode>${productData.ItemCode}</wtn:ItemCode>
            <wtn:UserName>${userName}</wtn:UserName>
            <wtn:Photo>${productData.Photo}</wtn:Photo>
            <wtn:Description>${productData.Description}</wtn:Description>
            <wtn:Packaging>${productData.Packaging}</wtn:Packaging>
            <wtn:Unit>${productData.Unit}</wtn:Unit>
          </wtn:additem>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .set('Authorization', 'barrear token WebAuth1234');

      this.submitted=false;
    this.http.post('https://www.aspiresoft.co.ke/Wt/APIs.aspx/additem', soapRequest, { headers, responseType: 'text' })
      .subscribe(
        (data) => {
          console.log(data, 'data')
          console.log('Product added successfully:', data);
          this.productForm.reset();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
  }

  onGetProductList() {
    const username = localStorage.getItem('username');
    this.router.navigate(['/product-list', { username: username }]);
  } 
}
