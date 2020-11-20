import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/models/author/Author';
import { PagedResponce } from 'src/app/models/common/PagedResponce';
import { PaginationQuery } from 'src/app/models/common/PaginationQuery';
import { AuthorFilter } from 'src/app/models/filters/AuthorFilter';

export enum AuthorActions {
  GET_AUTHOR = '[Author] Get Author',
  GET_AUTHOR_SUCCESS = '[Author] Get Author Success',
  GET_AUTHOR_FAILURE = '[Author] Get Author Failure',

  GET_AUTHORS = '[Author] Get Authors',
  GET_AUTHORS_SUCCESS = '[Author] Get Authors Success',
  GET_AUTHORS_FAILURE = '[Author] Get Authors Failure',

  GET_AUTHORS_LIST = '[Author] Get Authors List',
  GET_AUTHORS_LIST_SUCCESS = '[Author] Get Authors List Success',

  ADD_AUTHOR = '[Author] Add Author',
  ADD_AUTHOR_SUCCESS = '[Author] Add Author Success',
  ADD_AUTHOR_FAILURE = '[Author] Add Author Failure',

  REMOVE_AUTHOR = '[Author] Remove Author',
  REMOVE_AUTHOR_SUCCESS = '[Author] Remove Author Success',
  REMOVE_AUTHOR_FAILURE = '[Author] Remove Author Failure',

  DELETE_AUTHOR = '[Author] Delete Author',
  DELETE_AUTHOR_SUCCESS = '[Author] Delete Author Success',
  DELETE_AUTHOR_FAILURE = '[Author] Delete Author Failure',

  UPDATE_AUTHOR = '[Author] Update Author',
  UPDATE_AUTHOR_SUCCESS = '[Author] Update Author Success',
  UPDATE_AUTHOR_FAILURE = '[Author] Update Author Failure',
}

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
  props<{errorMessage: string}>()
)

export const getAuthorsList = createAction(
  AuthorActions.GET_AUTHORS_LIST
)

export const getAuthorsListSuccess = createAction(
  AuthorActions.GET_AUTHORS_LIST_SUCCESS,
  props<{authors: Author[]}>()
)

export const getAuthor = createAction(
  AuthorActions.GET_AUTHOR,
  props<{id: number}>()
)

export const getAuthorSuccess = createAction(
  AuthorActions.GET_AUTHOR_SUCCESS,
  props<Author>()
)

export const getAuthorFailure = createAction(
  AuthorActions.GET_AUTHOR_FAILURE,
  props<{errorMessage: string}>()
)

export const addAuthor = createAction(
  AuthorActions.ADD_AUTHOR,
  props<Author>()
)

export const addAuthorSuccess = createAction(
  AuthorActions.ADD_AUTHOR_SUCCESS,
  props<Author>()
)

export const addAuthorFailure = createAction(
  AuthorActions.ADD_AUTHOR_FAILURE,
  props<{errorMessage: string}>()
)

export const updateAuthor = createAction(
  AuthorActions.UPDATE_AUTHOR,
  props<Author>()
)

export const updateAuthorSuccess = createAction(
  AuthorActions.UPDATE_AUTHOR_SUCCESS,
  props<Author>()
)

export const updateAuthorFailure = createAction(
  AuthorActions.UPDATE_AUTHOR_FAILURE,
  props<{errorMessage: string}>()
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
  props<{errorMessage: string}>()
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
  props<{errorMessage: string}>()
)
