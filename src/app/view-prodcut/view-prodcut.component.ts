import { Product } from './../add-product/product';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { CartDataService } from '../../services/cart-data.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-prodcut',
  standalone: true,
  imports: [ RouterModule, RouterOutlet],
  templateUrl: './view-prodcut.component.html',
  styleUrl: './view-prodcut.component.css'
})

export class ViewProdcutComponent implements OnInit {
 
  productsList: any;
  item: any;
  data: any;

  constructor(
    private _api: ApiCallService,
    private cartDataService: CartDataService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.GetProductsList();
  }

  additem(item: any) {
    this.cartDataService.addToCart(item);
  }

  private GetProductsList() {
    this._api.getAllProducts().subscribe({
      next: (data: any) => {
        let productStringData:any = this.location.path().split('/').pop();
        let productId = parseInt(productStringData[productStringData?.length-1]);
        if (!isNaN(productId)) {
          this.productsList = data.data.find((item:any) => item.id == productId);
          console.log("this.productsList", this.productsList)
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  
  getImageData(data: any): SafeUrl {
    const decodedData = this.base64Decode(data);
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + decodedData);
    return imageUrl;
  }

  base64Decode(str: string): string {
    return atob(str);
  }
}
