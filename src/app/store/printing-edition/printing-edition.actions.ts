import { createAction, props } from '@ngrx/store';
import { PagedResponce } from 'src/app/models/common/PagedResponce';
import { PaginationQuery } from 'src/app/models/common/PaginationQuery';
import { PrintingEditionFilter } from 'src/app/models/filters/PrintingEditionFilter';
import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';
import { PrintingEditionItem } from 'src/app/models/PrintingEdition/PrintingEditionItem';

export enum PrintingEditionActions{
  GET_PRINTING_EDITION = '[Printing Edition] Get Printing Edition',
  GET_PRINTING_EDITION_SUCCESS = '[Printing Edition] Get Printing Edition Success',
  GET_PRINTING_EDITION_FAILURE = '[Printing Edition] Get Printing Edition Failure',

  GET_PRINTING_EDITIONS = '[Printing Edition] Get Printing Editions',
  GET_PRINTING_EDITIONS_SUCCESS = '[Printing Edition] Get Printing Editions Success',
  GET_PRINTING_EDITIONS_FAILURE = '[Printing Edition] Get Printing Editions Failure',

  ADD_PRINTING_EDITION = '[Printing Edition] Add Printing Edition',
  ADD_PRINTING_EDITION_SUCCESS = '[Printing Edition] Add Printing Edition Success',
  ADD_PRINTING_EDITION_FAILURE = '[Printing Edition] Add Printing Edition Failure',

  REMOVE_PRINTING_EDITION = '[Printing Edition] Remove Printing Edition',
  REMOVE_PRINTING_EDITION_SUCCESS = '[Printing Edition] Remove Printing Edition Success',
  REMOVE_PRINTING_EDITION_FAILURE = '[Printing Edition] Remove Printing Edition Failure',

  DELETE_PRINTING_EDITION = '[Printing Edition] Delete Printing Edition',
  DELETE_PRINTING_EDITION_SUCCESS = '[Printing Edition] Delete Printing Edition Success',
  DELETE_PRINTING_EDITION_FAILURE = '[Printing Edition] Delete Printing Edition Failure',

  UPDATE_PRINTING_EDITION = '[Printing Edition] Update Printing Edition',
  UPDATE_PRINTING_EDITION_SUCCESS = '[Printing Edition] Update Printing Edition Success',
  UPDATE_PRINTING_EDITION_FAILURE = '[Printing Edition] Update Printing Edition Failure',
}

export const getPrintingEdition = createAction(
  PrintingEditionActions.GET_PRINTING_EDITION,
  props<{id: number}>()
)

export const getPrintingEditionSuccess = createAction(
  PrintingEditionActions.GET_PRINTING_EDITION_SUCCESS,
  props<PrintingEdition>()
)

export const getPrintingEditionFailure = createAction(
  PrintingEditionActions.GET_PRINTING_EDITION_FAILURE,
  props<{errorMessage: string}>()
)

export const getPrintingEditions = createAction(
  PrintingEditionActions.GET_PRINTING_EDITIONS,
  props<{paginationQuery?: PaginationQuery, filter?: PrintingEditionFilter}>()
)

export const getPrintingEditionsSuccess = createAction(
  PrintingEditionActions.GET_PRINTING_EDITIONS_SUCCESS,
  props<PagedResponce>()
)

export const getPrintingEditionsFailure = createAction(
  PrintingEditionActions.GET_PRINTING_EDITIONS_FAILURE,
  props<{errorMessage: string}>()
)

export const addPrintingEdition = createAction(
  PrintingEditionActions.ADD_PRINTING_EDITION,
  props<PrintingEdition>()
)

export const addPrintingEditionSuccess = createAction(
  PrintingEditionActions.ADD_PRINTING_EDITION_SUCCESS,
  props<PrintingEdition>()
)

export const addPrintingEditionFailure = createAction(
  PrintingEditionActions.ADD_PRINTING_EDITION_FAILURE,
  props<{errorMessage: string}>()
)

export const updatePrintingEdition = createAction(
  PrintingEditionActions.UPDATE_PRINTING_EDITION,
  props<PrintingEdition>()
)

export const updatePrintingEditionSuccess = createAction(
  PrintingEditionActions.UPDATE_PRINTING_EDITION_SUCCESS,
  props<PrintingEdition>()
)

export const updatePrintingEditionFailure = createAction(
  PrintingEditionActions.UPDATE_PRINTING_EDITION_SUCCESS,
  props<{errorMessage: string}>()
)

export const removePrintingEdition = createAction(
  PrintingEditionActions.REMOVE_PRINTING_EDITION,
  props<{id: number}>()
)

export const removePrintingEditionSuccess = createAction(
  PrintingEditionActions.REMOVE_PRINTING_EDITION_SUCCESS,
  props<PrintingEdition>()
)

export const removePrintingEditionFailure = createAction(
  PrintingEditionActions.REMOVE_PRINTING_EDITION_FAILURE,
  props<{errorMessage: string}>()
)

export const deletePrintingEdition = createAction(
  PrintingEditionActions.DELETE_PRINTING_EDITION,
  props<{id: number}>()
)

export const deletePrintingEditionSuccess = createAction(
  PrintingEditionActions.DELETE_PRINTING_EDITION_SUCCESS
)

export const deletePrintingEditionFailure = createAction(
  PrintingEditionActions.DELETE_PRINTING_EDITION_FAILURE,
  props<{errorMessage: string}>()
)

