import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, delayWhen, map, mergeMap, switchMap, tap } from 'rxjs/internal/operators';
import { AuthData } from 'src/app/models/auth-data';
import { ACCESS_TOKEN_KEY, AccountService, REFRESH_TOKEN_KEY } from 'src/app/services/account.service';

import * as accountActions from 'src/app/store/account/account.actions';

@Injectable()
export class AccountEffects{

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.signIn),
    mergeMap(action => this.account.singIn({
      email: action.email,
      password: action.password
    }).pipe(
      map((authData: AuthData) => accountActions.signInSuccess(authData)),
      catchError(err => of(accountActions.signInFailure({errorMessage: err})))
    ))
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.singUp),
    switchMap(action => this.account.signUp({
      id: action.id,
      email: action.email,
      password: action.password,
      firstName: action.firstName,
      lastName: action.lastName
    }).pipe(
      map(() => accountActions.signUpSuccess()),
      catchError(errorMessage => of(accountActions.signUpFailure(errorMessage))
    ))
  )));

  confirmEmail$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.confirmEmail),
    switchMap(action => this.account.confrimEmail(action.email, action.code)
    .pipe(
      map(() => accountActions.confirmEmailSuccess()),
      catchError(errorMessage => of(accountActions.confirmEmailFailure(errorMessage)))
    )
  )))

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.signOut),
    switchMap(() => this.account.signOut())
  ), { dispatch: false })

  forgetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.forgetPassword),
    switchMap(action => this.account.forgetPassword({email: action.email})
    .pipe(
      map(() => accountActions.forgetPasswordSuccess()),
      catchError(errorMessage => of(accountActions.forgetPasswordFailure(errorMessage)))
    )
  )))

  refreshTokensThroughTime$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.signInSuccess),
    delayWhen(action => timer(action.exp * 1000 - 60 * 1000 - Date.now())),
    switchMap(() => this.account.refreshTokens({
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)
    }).pipe(
      map((authData: AuthData) => accountActions.signInSuccess(authData))
    ))
  ))

  redirectOnLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.signInSuccess),
    tap(() => this.router.navigate(['']))
  ), {dispatch: false})

  refreshTokensOnInitApp$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.refreshTokens),
    switchMap(action => this.account.refreshTokens({
      accessToken: action.accessToken,
      refreshToken: action.refreshToken
    }).pipe(
      map((authData: AuthData) => accountActions.signInSuccess(authData))
    ))
  ))
  constructor(private actions$: Actions, private account: AccountService, private router: Router) {}

}
