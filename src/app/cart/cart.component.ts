import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CartDataService } from '../../services/cart-data.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.css'],
  templateUrl: './cart.component.html',
  standalone:true,
  imports:[RouterModule, RouterOutlet]
})

export class CartComponent implements OnInit {
  cartList: any[] = [];
  total: number = 0;

  constructor(
    private cartDataService: CartDataService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authDataService: AuthDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartList = this.cartDataService.getCartItems();
    this.calculateTotalPrice();
  }

  deleteHandler(id: number): void {
    this.cartList = this.cartDataService.removeItem(id);
    this.calculateTotalPrice();
  }

  manageHandler(operator: string, id: number): void {
    this.cartDataService.counterHandler(operator, id);
    this.calculateTotalPrice();
  }

  getImageData(data: any): SafeUrl {
    const decodedData = this.base64Decode(data);
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64,' + decodedData
    );
    return imageUrl;
  }

  base64Decode(str: string): string {
    return atob(str);
  }

  redirectHandler(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  checkOutHandler(): void {
    if (this.checkAuthData()) {
      const data = this.cartList;
      const apiUrl = '/auth/add/order';
      const orderData: any[] = data.map((item) => ({
        productid: item.id,
        quantity: item.counter,
      }));

      this.http.post<any>(environment.apiUrl + apiUrl, {
        clientId: this.authDataService?.getAuthData(),
        order: orderData,
      }).subscribe(
        (response: { auth: any }) => {
          console.log('Your Order placed successfully:', response);
          this.cartList = [];
        },
        (error: HttpErrorResponse) => {
          console.error('Error placing order:', error);
          console.error(`Status: ${error.status}, Message: ${error.message}`);
        }
      );

      console.log('Testing', this.cartList);
    }
  }

  checkAuthData(): boolean {
    return this.authDataService.getLocalStorageData();


  }
  

  private calculateTotalPrice(): void {
    this.total = this.cartList.reduce(
      (acc, item) =>
        acc +
        (parseInt(item.price, 10) || 0) *
          (parseInt(item.counter, 10) || 0),
      0
    );
  }
}

