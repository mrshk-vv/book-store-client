import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { OrderItem } from 'src/app/models/order/order-item';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { createOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  displayedColumns: string[] = ['product', 'unit-price', 'qty', 'order-amount','actions'];
  cartItems: OrderItem[] = null

  cartCheck: boolean = false

  buyButton: boolean

  constructor(private cart: CartService,
              private store: Store<OrderState>,
              private dialog: MatDialogRef<CheckoutComponent>) {
    cart.cartItems.subscribe(
      cartItems => {
        this.cartItems = cartItems;
      }
    )
  }

  ngOnInit(): void {
    this.cartItems = this.cart.getCart
    if(this.cartItems === null){
      this.buyButton = true
    }
  }

  changeProductQuantity(orderItem: OrderItem , $event){
    this.cart.changeProductQuantity(orderItem, Number($event.target.value))
  }

  deleteProduct(orderItem: OrderItem){
    this.cart.deleteProduct(orderItem)
  }

  buy(){
    this.store.dispatch(createOrder({cart: this.cartItems}))
    this.dialog.close()
  }

  close(){
    this.dialog.close()
  }
}
