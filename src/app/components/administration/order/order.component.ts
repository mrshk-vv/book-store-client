import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderState } from 'src/app/store/order/order.reducer';

import * as orderActions from "src/app/store/order/order.actions";

import * as orderSelectors from 'src/app/store/order/order.selector'
import { OrderItem } from 'src/app/models/order/order-item';
import { Order } from 'src/app/models/order/order';
import { getNextPageSelector, getPreviousPageSelector } from 'src/app/store/order/order.selector';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  pageSize: number
  pageNumber: number

  nextPage: boolean = false
  previousPage: boolean = true

  orders: Order[]

  displayedColumns: string[] = ['order', 'date', 'client','product','title','quantity','order-amount','status'];
  constructor(private store: Store<OrderState>) { }

  ngOnInit(): void {
    this.store.pipe(select(orderSelectors.getPageNumberSelector)).subscribe(
      pageNumber => {
        this.pageNumber = pageNumber
      }
    )
    this.store.pipe(select(orderSelectors.getPageSizeSelector)).subscribe(
      pageSize => {
        this.pageSize = pageSize
      }
    )
    this.store.dispatch(orderActions.getOrders({
      paginationQuery: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      filter: null
    }))

    this.store.pipe(select(orderSelectors.getOrdersSelector)).subscribe(
      data => {
        this.orders = data
      }
    )
  }

  openNextPage(){
    if(this.availabilityNextPage()){
      this.store.dispatch(orderActions.getOrders({paginationQuery: {
        pageNumber: this.pageNumber + 1,
        pageSize: this.pageSize
      }, filter: null}))
    }
  }

  openPreviousPage(){
    if(this.availabilityPreviousPage()){
      this.store.dispatch(orderActions.getOrders({paginationQuery: {
        pageNumber: this.pageNumber - 1,
        pageSize: this.pageSize
      }, filter: null}))
    }
  }

  changeTableSize(){
    this.store.dispatch(orderActions.getOrders({paginationQuery: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }, filter: null}))
    this.availabilityNextPage()
    this.availabilityPreviousPage()
  }

  availabilityNextPage(): boolean{
    this.store.pipe(select(getNextPageSelector)).subscribe(
      data => {
        if(data === null){
          this.nextPage = true
          return true;
        }else{
          this.nextPage = false
          return false
        }
      }
    )
    this.previousPage = false
    return true
  }

  availabilityPreviousPage(): boolean{
    this.store.pipe(select(getPreviousPageSelector)).subscribe(
      data => {
        if(data === null){
          this.previousPage = true
          return true
        }
        else{
          this.nextPage = false
          return false
        }
      }
    )
    this.nextPage = false
    return true
  }
}
