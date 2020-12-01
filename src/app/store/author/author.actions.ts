import { Update } from '@ngrx/entity/src';
import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/models/author/author';
import { AuthorItem } from 'src/app/models/author/author-item';
import { PagedResponce } from 'src/app/models/common/paged-responce';
import { PaginationQuery } from 'src/app/models/common/pagination-query';
import { AuthorFilter } from 'src/app/models/filters/author.filter';

export enum AuthorActions {
  GET_AUTHOR = '[Author] Get Author',
  GET_AUTHOR_SUCCESS = '[Author] Get Author Success',
  GET_AUTHOR_FAILURE = '[Author] Get Author Failure',

  GET_AUTHORS = '[Author] Get Authors',
  GET_AUTHORS_SUCCESS = '[Author] Get Authors Success',
  GET_AUTHORS_FAILURE = '[Author] Get Authors Failure',

  ADD_AUTHOR = '[Author] Add Author',
  ADD_AUTHOR_SUCCESS = '[Author] Add Author Success',
  ADD_AUTHOR_FAILURE = '[Author] Add Author Failure',

  UPDATE_AUTHOR = '[Author] Update Author',
  UPDATE_AUTHOR_SUCCESS = '[Author] Update Author Success',
  UPDATE_AUTHOR_FAILURE = '[Author] Update Author Failure',

  DELETE_AUTHOR = '[Author] Delete Author',
  DELETE_AUTHOR_SUCCESS = '[Author] Delete Author Success',
  DELETE_AUTHOR_FAILURE = '[Author] Delete Author Failure',

  REMOVE_AUTHOR = '[Author] Remove Author',
  REMOVE_AUTHOR_SUCCESS = '[Author] Remove Author Success',
  REMOVE_AUTHOR_FAILURE = '[Author] Remove Author Failure',
}

export const getAuthor = createAction(
  AuthorActions.GET_AUTHOR,
  props<{id: number}>()
)

export const getAuthorSuccess = createAction(
  AuthorActions.GET_AUTHOR_SUCCESS,
  props<{author: Author}>()
)

export const getAuthorFailure = createAction(
  AuthorActions.GET_AUTHOR_FAILURE,
  props<{error: any}>()
)

export const getAuthors = createAction(
  AuthorActions.GET_AUTHORS,
  props<{paginationQuery?: PaginationQuery, filter?: AuthorFilter}>()
)

export const getAuthorsSuccess = createAction(
  AuthorActions.GET_AUTHORS_SUCCESS,
  props<PagedResponce>()
)

export const getAuthorsFailure = createAction(
  AuthorActions.GET_AUTHORS_FAILURE,
  props<{error: any}>()
)

export const addAuthor = createAction(
  AuthorActions.ADD_AUTHOR,
  props<{authorToAdd: AuthorItem}>()
)

export const addAuthorSuccess = createAction(
  AuthorActions.ADD_AUTHOR_SUCCESS,
  props<{authorAdded: Author}>()
)

export const addAuthorFailure = createAction(
  AuthorActions.ADD_AUTHOR_FAILURE,
  props<{error: any}>()
)

export const updateAuthor = createAction(
  AuthorActions.UPDATE_AUTHOR,
  props<{authorToUpdate: AuthorItem}>()
)

export const updateAuthorSuccess = createAction(
  AuthorActions.UPDATE_AUTHOR_SUCCESS,
  props<{authorUpdated: Update<Author>}>()
)

export const updateAuthorFailure = createAction(
  AuthorActions.UPDATE_AUTHOR_FAILURE,
  props<{error: any}>()
)

export const deleteAuthor = createAction(
  AuthorActions.DELETE_AUTHOR,
  props<{id: number}>()
)

export const deleteAuthorSuccess = createAction(
  AuthorActions.DELETE_AUTHOR_SUCCESS
)

export const deleteAuthorFailure = createAction(
  AuthorActions.DELETE_AUTHOR_FAILURE,
  props<{error: any}>()
)

export const removeAuthor = createAction(
  AuthorActions.REMOVE_AUTHOR,
  props<{id: number}>()
)

export const removeAuthorSuccess = createAction(
  AuthorActions.REMOVE_AUTHOR_SUCCESS,
  props<Author>()
)

export const removeAuthorFailure = createAction(
  AuthorActions.REMOVE_AUTHOR_FAILURE,
  props<{error: any}>()
)
