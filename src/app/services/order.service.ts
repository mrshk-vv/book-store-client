import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';
import { PagedResponce } from '../models/common/paged-responce';
import { PaginationQuery } from '../models/common/pagination-query';
import { Order } from '../models/order/order';
import { OrderItem } from '../models/order/order-item';
import { Payment } from '../models/order/payment';
import { OrderFilter } from '../shared/filters/order.filter';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiBaseUrl = `${environment.apiBaseUrl}/api/Order`

  constructor(private http: HttpClient,
              private cart: CartService) { }


  public getOrders(paginationQuery?: PaginationQuery, filter?: OrderFilter): Observable<PagedResponce>{
    let params = new HttpParams()
                .set('pageNumber',paginationQuery.pageNumber.toString())
                .set('pageSize', paginationQuery.pageSize.toString())

    if(filter != null || filter != undefined){
      if(filter.status != null)
      params = params.append('status', filter.status.toString())
    }

    return this.http.get<PagedResponce>(`${this.apiBaseUrl}/getOrders`, {params: params})
  }

  public getOrder(id: number){
    let params = new HttpParams().set('id', id.toString())

    return this.http.get<Order>(`${this.apiBaseUrl}/getOrder`, {params: params})
  }

  public getClientOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiBaseUrl}/getClientOrders`)
  }

  public createOrder(orderItems: Array<OrderItem>){
    return this.http.post<number>(`${this.apiBaseUrl}/createOrder`, orderItems).subscribe(
      orderId => {
        localStorage.setItem('orderId', orderId.toString())
        localStorage.removeItem(`${this.cart.clientId}`)
      }
    )
  }

  public payOrder(order: Order, token: string){
    let payment: Payment = {
      order: order,
      token: token
    }
    return this.http.post(`${this.apiBaseUrl}/payOrder`, payment)
  }
}
