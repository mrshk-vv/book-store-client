import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { config, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import { OrderComponent } from 'src/app/components/administration/order/order.component';
import { PaymentComponent } from 'src/app/components/order/payment/payment.component';
import { OrderService } from 'src/app/services/order.service';

import * as orderActions from 'src/app/store/order/order.actions';


@Injectable()
export class OrderEffects{

  getOrder$ = createEffect(() => this.$actions.pipe(
    ofType(orderActions.getOrder),
    switchMap(action => this.order.getOrder(action.id).pipe(
      map(order => orderActions.getOrderSuccess({order: order})),
      tap(order => localStorage.setItem('order', JSON.stringify(order))),
      catchError(err => of(orderActions.getOrderFailure({error: err})))
      )
  )))

  getOrders$ = createEffect(() => this.$actions.pipe(
    ofType(orderActions.getOrders),
    switchMap(action => this.order.getOrders(
      action.paginationQuery,
      action.filter
      ).pipe(
        map(pagedResponce => orderActions.getOrdersSuccess({pagedResponce: pagedResponce})),
        catchError(err => of(orderActions.getOrdersFailure({error: err})))
      )
  )))

  startPayOrder$ = createEffect(() => this.$actions.pipe(
    ofType(orderActions.getOrderSuccess),
    tap(() => this.dialog.open(PaymentComponent, {width: "30%"}))
  ), {dispatch: false})

  payOrder$ = createEffect(() => this.$actions.pipe(
    ofType(orderActions.payOrder),
    switchMap(action => this.order.payOrder(action.order, action.stripeToken)
    .pipe(
      map(() => orderActions.payOrderSuccess()),
      catchError(err => of(orderActions.payOrderFailure({error: err})))
    )
  )))

  constructor(private $actions: Actions,
              private order: OrderService,
              private dialog: MatDialog) {}
}
