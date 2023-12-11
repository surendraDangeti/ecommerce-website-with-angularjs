import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CartDataService } from '../../services/cart-data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[ RouterModule, RouterOutlet]
})
export class HomeComponent implements OnInit {

  productsList: any;
  item: any;
  data: any;

  constructor(
    private _api: ApiCallService,
    private cartDataService: CartDataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  getImageData(data: any): SafeUrl {
    const decodedData = this.base64Decode(data);
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + decodedData);
    return imageUrl;
  }

  base64Decode(str: string): string {
    return atob(str);
  }

  additem(item: any) {
    this.cartDataService.addToCart(item);
  }

  ngOnInit(): void {
    this.GetProductsList();
  }

  redirectHandler(productId: number): void{
    this.router.navigate(['/product', productId]);
  }

  private GetProductsList() {
    this._api.getAllProducts().subscribe({
      next: data => {
        this.productsList = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
