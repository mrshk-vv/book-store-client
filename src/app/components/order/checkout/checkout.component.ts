import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderItem } from 'src/app/models/order/order-item';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  displayedColumns: string[] = ['product', 'unit-price', 'qty', 'order-amount','actions'];
  cartItems: Array<OrderItem> = []

  cartCheck: boolean = false
  totalAmount: number

  constructor(private cart: CartService,
              private order: OrderService,
              private dialog: MatDialogRef<CheckoutComponent>) {
    cart.cartItems.subscribe(
      cartItems => {
        this.cartItems = cartItems;
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

  buy(){
    this.order.createOrder(this.cart.getCart)
  }

  close(){
    this.dialog.close()
  }
}
