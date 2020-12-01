import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe} from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';

import { select, Store } from '@ngrx/store';

import { Author } from 'src/app/models/author/author';
import { AuthorService } from 'src/app/services/author.service';
import * as authorActions from 'src/app/store/author/author.actions';
import { PaginationQuery } from 'src/app/models/common/pagination-query';

@Injectable()
export class AuthorEffects{

  getAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.getAuthor),
    switchMap(action => this.author.getAuthor(action.id)
    .pipe(
      map(action => authorActions.getAuthorSuccess({author: action})),
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

  addAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.addAuthor),
    switchMap(action => this.author.addAuthor(action.authorToAdd)
    .pipe(
      map(author => authorActions.addAuthorSuccess({authorAdded: author})),
      catchError(err => of(authorActions.addAuthorFailure(err)))
    )
  )))

  updateAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(authorActions.updateAuthor),
    switchMap(action => this.author.updateAuthor(action.authorToUpdate)
    .pipe(
      map(author => authorActions.updateAuthorSuccess(
        {
          authorUpdated: {
            id: author.id,
            changes: author
          }
      })),
      catchError(err => of(authorActions.updateAuthorFailure(err)))
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
