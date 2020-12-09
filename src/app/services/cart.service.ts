import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/order/order-item';
import { PrintingEdition } from '../models/printingEdition/printing-edition';
import { AccountState } from '../store/account/account.reducer';
import { getUserIdSelector } from '../store/account/account.selector';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  clientId: string = null
  orderItems: Array<OrderItem> = []

  cartItems = new BehaviorSubject(this.getCart)

  constructor(private store: Store<AccountState>) {
    store.pipe(select(getUserIdSelector)).subscribe(
      userId => {
        this.clientId = userId
      }
    )
  }

  set setCart(orderItems: OrderItem[]){
    this.cartItems.next(orderItems)
    localStorage.setItem(this.clientId, JSON.stringify(orderItems))
  }

  get getCart(){
    return JSON.parse(localStorage.getItem(this.clientId))
  }

  createCart(){
    localStorage.setItem(this.clientId, null)
  }

  changeProductQuantity(product: OrderItem, quantity: number){
    this.orderItems = this.getCart
    let orderItemIndex = this.orderItems.findIndex(i => i.printingEditionId === product.printingEditionId)
    this.orderItems[orderItemIndex].amount = quantity
    this.setCart = this.orderItems
  }

  addProduct(printingEdition: PrintingEdition, amount: number){
    let orderItem: OrderItem = {
      id: 0,
      amount: amount,
      currency: printingEdition.editionCurrency,
      printingEditionId: printingEdition.id,
      printingEdition: printingEdition,
      orderId: 0,
      order: null,
    }

    let cart = this.getCart
    if(cart === null){
      this.createCart()
      this.orderItems.push(orderItem)
      this.setCart = this.orderItems
      return
    }else{
      this.orderItems = this.getCart

      if(this.orderItems.find(i => i.printingEditionId === printingEdition.id)){
        let orderItemIndex = this.orderItems.findIndex(i => i.printingEditionId === printingEdition.id)
        this.orderItems[orderItemIndex].amount += amount
      }else{
        this.orderItems.push(orderItem)
      }
      this.setCart = this.orderItems
      this.orderItems = []
    }
  }

  deleteProduct(orderItem: OrderItem){
    this.orderItems = this.getCart
    let orderItemIndex = this.orderItems.findIndex(i => i.printingEditionId = orderItem.printingEditionId)
    if(orderItemIndex != -1){
      this.orderItems.splice(orderItemIndex, 1)
    }
    console.log(this.orderItems)
    this.setCart = this.orderItems
  }
}
