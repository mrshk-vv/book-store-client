import { createAction, props } from '@ngrx/store';
import { PagedResponce } from 'src/app/models/common/paged-responce';
import { PaginationQuery } from 'src/app/models/common/pagination-query';
import { Order } from 'src/app/models/order/order';
import { OrderFilter } from 'src/app/shared/filters/order.filter';

export enum OrderActions{
  GET_ORDERS = "[Order] Get Orders",
  GET_ORDERS_SUCCESS = "[Order] Get Orders Success",
  GET_ORDERS_FAILURE = "[Order] Get Orders Failure",

  GET_ORDER = "[Order] Get Order",
  GET_ORDER_SUCCESS = "[Order] Get Order SUCCESS",
  GET_ORDER_FAILURE = "[Order] Get Order Failure",

  PAY_ORDER = "[Order] Pay Order",
  PAY_ORDER_SUCCESS = "[Order] Pay Order Success",
  PAY_ORDER_FAILURE = "[Order] Paye Order Failure"
}

export const getOrders = createAction(
  OrderActions.GET_ORDERS,
  props<{paginationQuery: PaginationQuery,filter: OrderFilter}>()
)

export const getOrdersSuccess = createAction(
  OrderActions.GET_ORDERS_SUCCESS,
  props<{pagedResponce: PagedResponce}>()
)

export const getOrdersFailure = createAction(
  OrderActions.GET_ORDERS_FAILURE,
  props<{error: any}>()
)


export const getOrder = createAction (
  OrderActions.GET_ORDER,
  props<{id: number}>()
)

export const getOrderSuccess = createAction(
  OrderActions.GET_ORDER_SUCCESS,
  props<{order: Order}>()
)

export const getOrderFailure = createAction(
  OrderActions.GET_ORDER_FAILURE,
  props<{error: any}>()
)

export const payOrder = createAction(
  OrderActions.PAY_ORDER,
  props<{stripeToken: any, order: Order}>()
)

export const payOrderSuccess = createAction(
  OrderActions.PAY_ORDER_SUCCESS,
)

export const payOrderFailure = createAction(
  OrderActions.PAY_ORDER_FAILURE,
  props<{error: any}>()
)


