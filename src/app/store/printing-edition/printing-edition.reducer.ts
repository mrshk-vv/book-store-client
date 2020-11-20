import { createReducer, on } from '@ngrx/store';

import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';
import { AppState } from '../states/app-state';

import * as printingEditionActions from '../printing-edition/printing-edition.actions';


export const PRINTING_EDITION_REDUCER_NODE = 'printing edition'

export interface PrintingEditionState extends AppState{
  printingEditions: PrintingEdition[]
  selectedPrintingEdition: PrintingEdition
}

export const initialPrintingEditionState: PrintingEditionState = {
  printingEditions: null,
  selectedPrintingEdition: null,
  pageNumber: 1,
  pageSize: 6,
  nextPage: null,
  previousPage: null,
  errorMessage: null
}

export const printingEditionReducer = createReducer(
  initialPrintingEditionState,

 on(printingEditionActions.getPrintingEditions, state => ({
  ...state,
 })),
 on(printingEditionActions.getPrintingEditionsSuccess, (state, action) => ({
  ...state,
  printingEditions: action.data,
  selectedPrintingEdition: null,
  pageNumber: action.pageNumber,
  pageSize: action.pageSize,
  nextPage: action.nextPage,
  previousPage: action.previousPage
 })),
 on(printingEditionActions.getPrintingEditionsFailure, (state, action) => ({
   ...state,
   errorMessage: action.errorMessage
 })),


 on(printingEditionActions.getPrintingEdition, state => ({
   ...state,
   selectedPrintingEdition: null
 })),
 on(printingEditionActions.getPrintingEditionSuccess, (state, printingEdition) => ({
   ...state,
   selectedPrintingEdition: printingEdition
 })),
 on(printingEditionActions.getPrintingEditionFailure, (state, action) => ({
   ...state,
   errorMessage: action.errorMessage
 })),


 on(printingEditionActions.addPrintingEdition, state => ({
   ...state
 })),
 on(printingEditionActions.addPrintingEditionSuccess, (state, printingEdition) => ({
   ...state,
   printingEditions: state.printingEditions.length === state.pageSize ? [...state.printingEditions] :
                     [...state.printingEditions, printingEdition]
 })),
 on(printingEditionActions.addPrintingEditionFailure, (state, action) => ({
   ...state,
   errorMessage: action.errorMessage
 })),

 on(printingEditionActions.updatePrintingEdition, state => ({
   ...state
 })),
 on(printingEditionActions.updatePrintingEditionSuccess, (state, printingEdition) => ({
   ...state,
   printingEditions: state.printingEditions.map(pe => pe.id === printingEdition.id ? {
    ...pe,
    printingEdition: printingEdition,
   } : pe)
 })),
 on(printingEditionActions.updatePrintingEditionFailure, (state, action) => ({
   ...state,
   errorMessage: action.errorMessage
 })),

 on(printingEditionActions.deletePrintingEdition, (state, printingEdition) => ({
   ...state,
   selectedPrintingEdition: state.printingEditions.find(pe => pe.id === printingEdition.id)
 })),
 on(printingEditionActions.deletePrintingEditionSuccess, state => ({
   ...state,
   selectedPrintingEdition: null,
   printingEditions: state.printingEditions.filter(pe => pe.id != state.selectedPrintingEdition.id)
 })),
 on(printingEditionActions.deletePrintingEditionFailure , (state, action) => ({
  ...state,
  errorMessage: action.errorMessage
 })),


//  on(printingEditionActions.removePrintingEdition, (state, action) => ({
//    ...state,
//    selectedPrintingEdition: state.printingEditions.find(pe => pe. === action.id)
//  })),
//  on(printingEditionActions.removePrintingEditionSuccess, (state, action) => ({
//    ...state,
//    printingEditions: state.printingEditions.map(pe => pe.id === action.printingEditionRemoved.id ? {
//      ...pe,
//      printingEdition: action.printingEditionRemoved
//    } : pe)
//  })),
//  on(printingEditionActions.removePrintingEditionFailure, (state, action) => ({
//    ...state,
//    errorMessage: action.errorMessage
//  }))
)



