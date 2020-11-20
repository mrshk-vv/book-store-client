import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe} from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';

import { select, Store } from '@ngrx/store';

import { Author } from 'src/app/models/author/Author';
import { AuthorService } from 'src/app/services/author.service';
import * as authorActions from 'src/app/store/author/author.actions';
import { PaginationQuery } from 'src/app/models/common/PaginationQuery';

@Injectable()
export class AuthorEffects{

  getAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.getAuthor),
    switchMap(action => this.author.getAuthor(action.id)
    .pipe(
      map((author: Author) => authorActions.getAuthorSuccess(author)),
      catchError(err => of(authorActions.getAuthorFailure(err)))
    )
  )))

  getAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.getAuthors),
    mergeMap(action => this.author.getAuthors(
      action.paginationQuery,
      action.filter
    ).pipe(
      map(pagedResponce => authorActions.getAuthorsSuccess(pagedResponce)),
      catchError(err => of(authorActions.getAuthorsFailure(err)))
    )
  )))

  getAuthorsList$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.getAuthorsList),
    mergeMap(() => this.author.getAuthorsList().pipe(
      map(authors => authorActions.getAuthorsListSuccess({authors: authors}))
    ))
  ))

  addAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.addAuthor),
    switchMap(action => this.author.addAuthor(action)
    .pipe(
      map((author: Author) => authorActions.addAuthorSuccess(author)),
      catchError(err => of(authorActions.addAuthorFailure(err)))
    )
  )))

  updateAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.updateAuthor),
    switchMap(action => this.author.updateAuthor(action)
    .pipe(
      map((author: Author) => authorActions.updateAuthorSuccess(author)),
      catchError(err => of(authorActions.updateAuthorFailure(err)))
    )
  )))

  removeAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.removeAuthor),
    switchMap(action => this.author.removeAuthor(action.id)
    .pipe(
      map((author: Author) => authorActions.removeAuthorSuccess(author)),
      catchError(err => of(authorActions.removeAuthorFailure(err)))
    )
  )))

  deleteAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.deleteAuthor),
    switchMap(author => this.author.deleteAuthor(author.id)
    .pipe(
      map(() => authorActions.deleteAuthorSuccess()),
      catchError(err => of(authorActions.deleteAuthorFailure(err)))
    )
  )))

  constructor(private store: Store, private actions$: Actions, private author: AuthorService){}
}
