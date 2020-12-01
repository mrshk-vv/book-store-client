import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PrintingEditionState, PRINTING_EDITION_REDUCER_NODE, selectAll } from './printing-edition.reducer';

const getPrintingEditionFeature = createFeatureSelector<PrintingEditionState>(PRINTING_EDITION_REDUCER_NODE)

export const getPrintingEditionsSelector = createSelector(
  getPrintingEditionFeature,
  selectAll
)

export const getPreviousPageSelector = createSelector(
  getPrintingEditionFeature,
  state => state.previousPage
)

export const getNextPageSelector = createSelector(
  getPrintingEditionFeature,
  state => state.nextPage
)

export const getPageSizeSelector = createSelector(
  getPrintingEditionFeature,
  state => state.pageSize
)

export const getPageNumberSelector = createSelector(
  getPrintingEditionFeature,
  state => state.pageNumber
)
