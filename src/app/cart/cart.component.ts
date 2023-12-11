import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CartDataService } from '../../services/cart-data.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartList = this.cartDataService.getCartItems();
    this.calculateTotalPrice();
  }

  deleteHandler(id: number) {
    this.cartList = this.cartDataService.removeItem(id);
    this.calculateTotalPrice();
  }

  manageHandler(operator: string, id: number) {
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

  private calculateTotalPrice() {
    this.total = 0;

    this.cartList.forEach((item: any) => {
      const currentitemPrice = parseInt(item.price, 10) || 0;
      const requiredItems = parseInt(item.counter, 10) || 0;

      if (!isNaN(currentitemPrice) && !isNaN(requiredItems)) {
        this.total += requiredItems * currentitemPrice;
      }
    });
  }
}

