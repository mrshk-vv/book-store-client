import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { time } from "console";
import { tap, timeout } from "rxjs/internal/operators";
import { signIn, signInFailure, signInSuccess } from "src/app/store/account/account.actions";
import { getAuthors, getAuthorsSuccess } from "src/app/store/author/author.actions";
import { getPrintingEdition, getPrintingEditions, getPrintingEditionsSuccess } from "src/app/store/printing-edition/printing-edition.actions";
import { SpinnerComponent } from "./spinner-view.component";
import { SpinnerService } from "./spinner.service";

@Injectable()
export class SpinnerEffect{

  ref: MatDialogRef<SpinnerComponent>

  openSpinner$ = createEffect(() => this.actions.pipe(
    ofType(getPrintingEditions,
           getAuthors,
           signIn),
           tap(() => {this.ref = this.spinner.start()})

  ), {dispatch: false})

  closeSpinner$ = createEffect(() => this.actions.pipe(
    ofType(getPrintingEditionsSuccess,
          getAuthors,
          signInSuccess,
          signInFailure),
          tap(() => setTimeout(() => this.spinner.stop(this.ref),100))
  ), {dispatch: false})

  constructor(private spinner: SpinnerService,
              private actions: Actions){}
}
