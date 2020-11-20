import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorState, AUTHOR_REDUCER_NODE } from './author.reducer';

export const getAuthorFeature = createFeatureSelector<AuthorState>(AUTHOR_REDUCER_NODE)

export const getAuthorsSelector = createSelector(
  getAuthorFeature,
  state => state.authors
)

export const getPageNumberSelector = createSelector(
  getAuthorFeature,
  state => state.pageNumber
)

export const getPageSizeSelector = createSelector(
  getAuthorFeature,
  state => state.pageSize
)

export const getNextPageSelector = createSelector(
  getAuthorFeature,
  state => state.nextPage
)

export const getPreviousPageSelector = createSelector(
  getAuthorFeature,
  state => state.previousPage
)
