import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { UserService } from 'src/app/services/user.service';

import * as userActions from "src/app/store/user/user.actions";

@Injectable()
export class UserEffects{

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.getUser),
    switchMap(action => this.user.getUser(action.id).pipe(
      map(user => userActions.getUserSuccess({user: user})),
      catchError(err => of(userActions.getUserFailure({error: err})))
    ))
  ))

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.getUsers),
    switchMap(action => this.user.getUsers(
      action.paginationQuery,
      action.filter
    ).pipe(
      map(pagedResponce => userActions.getUsersSuccess(pagedResponce)),
      catchError(err => of(userActions.getUsersFailure({error: err})))
    ))
  ))

  editUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.editUser),
    switchMap(action => this.user.editUser(action.userToEdit).pipe(
      map(userEdited => userActions.editUserSuccess({userEdited: {
        id: userEdited.id,
        changes: userEdited
      }})),
      catchError(err => of(userActions.editUserFailure({error: err})))
    ))
  ))

  blockUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.changeUserBlockStatus),
    switchMap(action => this.user.changeUserBlockStatus(action.id).pipe(
      map(userBlocked => userActions.changeUserBlockStatusSuccess({user: {
        id: userBlocked.id,
        changes: userBlocked
      }}))
    ))
  ))

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.deleteUser),
    switchMap(action => this.user.deleteUser(action.id).pipe(
      map(() => userActions.deleteUserSuccess()),
      catchError(err => of(userActions.deleteUserFailure({error: err})))
    ))
  ))

  constructor(private actions$: Actions,  private user: UserService){}
}
