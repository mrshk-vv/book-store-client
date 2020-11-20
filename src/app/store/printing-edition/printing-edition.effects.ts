import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';

import { PrintingEdition } from 'src/app/models/PrintingEdition/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import * as printingEditionActions from '../printing-edition/printing-edition.actions';

@Injectable()
export class PrintingEditionEffects{

  getPrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.getPrintingEdition),
    switchMap(action => this.printingEdition.getPrintingEdition(
      action.id.toString()
    ).pipe(
      map((printingEdition: PrintingEdition) => printingEditionActions.getPrintingEditionSuccess(printingEdition)),
      catchError(errorMessage => of(printingEditionActions.getPrintingEditionFailure(errorMessage)))
    )
  )))

  getPrintingEditions$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.getPrintingEditions),
    mergeMap(action => this.printingEdition.getPrintingEditions(
      action.paginationQuery,
      action.filter
    ).pipe(
      map(pagedResponce => printingEditionActions.getPrintingEditionsSuccess(pagedResponce)),
      catchError(errorMessage => of(printingEditionActions.getPrintingEditionsFailure(errorMessage)))
    )
  )))

  addPrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.addPrintingEdition),
    switchMap(printingEditionItem => this.printingEdition.addPrintingEdition(printingEditionItem)
    .pipe(
      map((printingEdition: PrintingEdition) => printingEditionActions.addPrintingEditionSuccess(printingEdition)),
      catchError(err => of(printingEditionActions.addPrintingEditionFailure({errorMessage: err})))
    )
  )))

  updatePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.updatePrintingEdition),
    switchMap(printingEditionItem => this.printingEdition.updatePrintingEdition(printingEditionItem)
    .pipe(
      map((printingEdition: PrintingEdition) => printingEditionActions.updatePrintingEditionSuccess(printingEdition)),
      catchError(err => of(printingEditionActions.updatePrintingEditionFailure({errorMessage: err})))
    )
  )))

  deletePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.deletePrintingEdition),
    switchMap(printingEdition => this.printingEdition.deletePrintingEdition(printingEdition.id)
    .pipe(
      map(() => printingEditionActions.deletePrintingEditionSuccess()),
      catchError(err => of(printingEditionActions.deletePrintingEditionFailure({errorMessage: err})))
    )
  )))

  removePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.removePrintingEdition),
    switchMap(action => this.printingEdition.removePrintingEdition(action.id.toString())
    .pipe(
      map((printingEdition: PrintingEdition) => printingEditionActions.removePrintingEditionSuccess(printingEdition)),
      catchError(err => of(printingEditionActions.removePrintingEditionFailure({errorMessage: err})))
    )
  )))


  constructor(private actions$: Actions, private printingEdition: PrintingEditionService){}
}
