import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order.service';
import { getOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {

  orders: Order[]
  displayedColumns: string[] = ['order', 'date', 'client','product','title','quantity','order-amount','status'];

  constructor(private order: OrderService,
              private store: Store<OrderState>) {
      order.getClientOrders().subscribe(
        orders => {
          this.orders = orders
        }
      )
   }

  ngOnInit(): void {
  }

  payOrder(id: number){
    this.store.dispatch(getOrder({id: id}))
  }

}
