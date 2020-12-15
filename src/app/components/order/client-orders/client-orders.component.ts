import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order.service';
import { getClientOrders, getOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';
import { getClientOrdersSelector } from 'src/app/store/order/order.selector';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {

  orders: Order[]
  displayedColumns: string[] = ['order', 'date', 'client','product','title','quantity','order-amount','status'];

  constructor(private order: OrderService,
              private store: Store<OrderState>) {}

  ngOnInit(): void {
    this.store.dispatch(getClientOrders())
    this.store.select(getClientOrdersSelector).subscribe(
      orders => {
        this.orders = orders
      }
    )
  }

  payOrder(id: number){
    this.store.dispatch(getOrder({id: id}))
  }

}
