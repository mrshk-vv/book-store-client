import { createFeatureSelector, createSelector } from '@ngrx/store'
import { OrderState, ORDER_REDUCER_NODE, selectAll } from './order.reducer'

const getOrderFeature = createFeatureSelector<OrderState>(ORDER_REDUCER_NODE)

export const getOrdersSelector = createSelector(
  getOrderFeature,
  selectAll
)

export const getOrderSelector = createSelector(
  getOrderFeature,
  state => state.selectedOrder
)

export const getPageSizeSelector = createSelector(
  getOrderFeature,
  state => state.pageSize
)

export const getPageNumberSelector = createSelector(
  getOrderFeature,
  state => state.pageNumber
)
