import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { AppState } from '../states/app-state';

import * as orderActions from 'src/app/store/order/order.actions'
import { Order } from 'src/app/models/order/order';
import { authData } from '../account/account.reducer';

export const ORDER_REDUCER_NODE = 'order'

const clientId = authData.id

export interface OrderState extends AppState,EntityState<Order>{
  clientOrders: Order[]
  selectedOrder: Order
  error: null
}

export const orderAdapter : EntityAdapter<Order> = createEntityAdapter<Order>()

export const initinalOrderState = orderAdapter.getInitialState({
  selectedOrder: null,
  clientOrders: null,
  pageNumber: 1,
  pageSize: 6,
  nextPage: null,
  previousPage: null,
  error: null
})

export const orderReducer = createReducer(
  initinalOrderState,
  on(orderActions.getOrderSuccess, (state, action) => {
    return{
      ...state,
      selectedOrder: action.order
    }
  }),

  on(orderActions.getOrdersSuccess, (state, action) =>
    orderAdapter.setAll(action.pagedResponce.data, {
      ...state,
      pageNumber: action.pagedResponce.pageNumber,
      pageSize: action.pagedResponce.pageSize,
      nextPage: action.pagedResponce.nextPage,
      previousPage: action.pagedResponce.previousPage,
    })
  ),
  on(orderActions.getOrdersFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.getClientOrdersSuccess, (state, action) => {
    return{
      ...state,
      clientOrders: action.clientOrders
    }
  }),
  on(orderActions.getOrdersFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.createOrderSuccess, (state,action) => {
    localStorage.removeItem(clientId)
    return{
      ...state,
      selectedOrder: action.order
    }
  }),
  on(orderActions.createOrderFailure, (state,action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.payOrderSuccess, state => {
    return{
      ...state,
      selectedOrder: null
    }
  }),
  on(orderActions.payOrderFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  })


)

export const { selectAll } = orderAdapter.getSelectors()
