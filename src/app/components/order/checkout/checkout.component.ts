import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/order/order-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  displayedColumns: string[] = ['product', 'unit-price', 'qty', 'order-amount','actions'];
  cartItems: Array<OrderItem> = []

  cartCheck: boolean = false

  constructor(private cart: CartService) {
    cart.cartItems.subscribe(
      cartItems => {
        this.cartItems = cartItems
        if(this.cartItems === null || this.cartItems === []){
          this.cartCheck = true
        }
      }
    )
  }

  ngOnInit(): void {
    this.cartItems = this.cart.getCart
  }

  changeProductQuantity(orderItem: OrderItem , $event){
    this.cart.changeProductQuantity(orderItem, Number($event.target.value))
  }

  deleteProduct(orderItem: OrderItem){
    this.cart.deleteProduct(orderItem)
  }

}
