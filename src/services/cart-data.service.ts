import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  static cart(arg0: string, cart: any) {
    throw new Error('Method not implemented.');
  }
  static addToCart(item: any) {
    throw new Error('Method not implemented.');
  }
  cart: any[] = [];

  UpdateCart(){
   localStorage.setItem("cartdata", JSON.stringify(this.cart))
  }

  getOldData(){
   let oldData:any = localStorage.getItem("cartdata")
   return  JSON.parse(oldData)
  }

  addToCart(item: any) {
    let index = this.cart.findIndex((currentItem: any) => item.name === currentItem.name && item.id === currentItem.id);
    if (index === -1) {
        item.counter = 1;
        this.cart.push(item);
        this.UpdateCart()
    } else {
        this.cart[index].counter++;
    }
}


  getCartItems(): any[] {
    return this.cart;
  }

  getCartItem(id: number) {
    return this.cart[id];
  }

  removeItem(id: number){
    let removeItem =  this.cart.filter((item)=> item.id !== id);
    this.cart = removeItem
    return removeItem
  }

  counterHandler(operator: string, id: number) {
    let updateCounterItem = this.cart.find((item) => item.id === id);
  
    if (updateCounterItem) {
      if (operator === '+') {
        updateCounterItem.counter++;
      } else if (operator === '-') {
        if(updateCounterItem.counter - 1 > 0 ){
          updateCounterItem.counter--
        };
      }
    } else {
      console.log("Item not found in the cart");
    }
  }
  
}
