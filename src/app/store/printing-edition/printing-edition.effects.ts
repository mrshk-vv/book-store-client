import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';

import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import * as printingEditionActions from '../printing-edition/printing-edition.actions';

@Injectable()
export class PrintingEditionEffects{

  getPrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.getPrintingEdition),
    switchMap(action => this.printingEdition.getPrintingEdition(
      action.id.toString()
    ).pipe(
      map(printingEdition => printingEditionActions.getPrintingEditionSuccess({printingEdition: printingEdition})),
      catchError(errorMessage => of(printingEditionActions.getPrintingEditionFailure(errorMessage)))
    )
  )))

  getPrintingEditions$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.getPrintingEditions),
    switchMap(action => this.printingEdition.getPrintingEditions(
      action.paginationQuery,
      action.filter
    ).pipe(
      map((pagedResponce) => printingEditionActions.getPrintingEditionsSuccess({pagedResponce: pagedResponce})),
      catchError(err => of(printingEditionActions.getPrintingEditionsFailure(err)))
    )
  )))

  addPrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.addPrintingEdition),
    switchMap(action => this.printingEdition.addPrintingEdition(action.printinEditionToAdd)
    .pipe(
      map(printingEdition => printingEditionActions.addPrintingEditionSuccess({printinEditionAdded: printingEdition})),
      catchError(err => of(printingEditionActions.addPrintingEditionFailure({error: err})))
    )
  )))

  updatePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.updatePrintingEdition),
    switchMap(action => this.printingEdition.updatePrintingEdition(action.printingEditionToUpdate)
    .pipe(
      map(printingEdition => printingEditionActions.updatePrintingEditionSuccess(
        {
          printingEditionUpdated: {
          id: printingEdition.id,
          changes: printingEdition
          }
        }
      )),
      catchError(err => of(printingEditionActions.updatePrintingEditionFailure({error: err})))
    )
  )))

  deletePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(printingEditionActions.deletePrintingEdition),
    switchMap(printingEdition => this.printingEdition.deletePrintingEdition(printingEdition.id)
    .pipe(
      map(() => printingEditionActions.deletePrintingEditionSuccess()),
      catchError(err => of(printingEditionActions.deletePrintingEditionFailure({error: err})))
    )
  )))

  constructor(private actions$: Actions, private printingEdition: PrintingEditionService){}
}
