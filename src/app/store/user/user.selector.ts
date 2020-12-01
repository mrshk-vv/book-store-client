import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, UserState, USER_REDUCER_NODE } from './user.reducer';

const getUserFeature = createFeatureSelector<UserState>(USER_REDUCER_NODE)

export const getUsersSelector = createSelector(
  getUserFeature,
  selectAll
)

export const getPreviousPageSelector = createSelector(
  getUserFeature,
  state => state.previousPage
)

export const getNextPageSelector = createSelector(
  getUserFeature,
  state => state.nextPage
)

export const getPageSizeSelector = createSelector(
  getUserFeature,
  state => state.pageSize
)

export const getPageNumberSelector = createSelector(
  getUserFeature,
  state => state.pageNumber
)
