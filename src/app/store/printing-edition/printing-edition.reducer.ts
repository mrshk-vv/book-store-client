import { createReducer, on } from '@ngrx/store';

import { PrintingEdition } from 'src/app/models/printingEdition/printing-edition';
import { AppState } from '../states/app-state';

import * as printingEditionActions from '../printing-edition/printing-edition.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { map } from 'rxjs/internal/operators';
import { act } from '@ngrx/effects';

export const PRINTING_EDITION_REDUCER_NODE = 'printing edition'

export interface PrintingEditionState extends AppState, EntityState<PrintingEdition> {
  selectedPrintingEdition: PrintingEdition
  error: undefined
}

export const peAdapter: EntityAdapter<PrintingEdition> = createEntityAdapter<PrintingEdition>()

export const initialPrintingEditionState = peAdapter.getInitialState({
  selectedPrintingEdition: null,
  pageNumber: 1,
  pageSize: 6,
  nextPage: null,
  previousPage: null,
  error: null
})

export const printingEditionReducer = createReducer(
  initialPrintingEditionState,

  on(printingEditionActions.getPrintingEditionsSuccess, (state, action) =>
    peAdapter.setAll(action.pagedResponce.data, {
      ...state,
      pageNumber: action.pagedResponce.pageNumber,
      pageSize: action.pagedResponce.pageSize,
      previousPage: action.pagedResponce.previousPage,
      nextPage: action.pagedResponce.nextPage
    })
  ),
  on(printingEditionActions.getPrintingEditionsFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(printingEditionActions.getPrintingEditionSuccess, (state, action) => {
    return{
      ...state,
      selectedPrintingEdition: action.printingEdition
    }
  }),
  on(printingEditionActions.getPrintingEditionFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(printingEditionActions.addPrintingEditionSuccess, (state, action) =>
    peAdapter.addOne(action.printinEditionAdded, state)
  ),
  on(printingEditionActions.addPrintingEditionFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(printingEditionActions.updatePrintingEditionSuccess, (state, action) =>
    peAdapter.updateOne(action.printingEditionUpdated,state)
  ),
  on(printingEditionActions.updatePrintingEditionFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(printingEditionActions.deletePrintingEdition, (state, action) => {
    return{
      ...state,
      selectedPrintingEdition: state.entities[action.id]
    }
  }),
  on(printingEditionActions.deletePrintingEditionSuccess, state =>
    peAdapter.removeOne(state.selectedPrintingEdition.id, {
      ...state,
      selectedPrintingEdition: null
    })
  ),
  on(printingEditionActions.deletePrintingEditionFailure , (state, action) => {
    return{
      ...state,
      erroe: action.error
    }
  }),
)

export const { selectAll } = peAdapter.getSelectors();


