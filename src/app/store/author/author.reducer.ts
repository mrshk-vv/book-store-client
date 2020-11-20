import { createReducer, on } from '@ngrx/store';

import { Author } from 'src/app/models/author/Author';
import * as authorActions from 'src/app/store/author/author.actions';

import { AppState } from '../states/app-state';

export const AUTHOR_REDUCER_NODE = 'author'

export interface AuthorState extends AppState{
  authors: Author[],
  selectedAuthor: Author
}

export const initialAuthorState: AuthorState = {
  authors: null,
  selectedAuthor: null,
  pageNumber: 1,
  pageSize: 6,
  nextPage: null,
  previousPage: null,
  errorMessage: null
}

export const authorReducer = createReducer(
  initialAuthorState,
  on(authorActions.getAuthor, state => ({
    ...state,
    selectedAuthor: null
  })),
  on(authorActions.getAuthorSuccess, (state, author) =>({
    ...state,
    selectedAuthor: author
  })),
  on(authorActions.getAuthorFailure, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage
  })),


  on(authorActions.getAuthors, state => ({
    ...state,
  })),
  on(authorActions.getAuthorsSuccess, (state, action) => ({
    ...state,
    authors: action.data,
    pageNumber: action.pageNumber,
    pageSize: action.pageSize,
    nextPage: action.nextPage,
    previousPage: action.previousPage
  })),
  on(authorActions.getAuthorFailure, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage
  })),

  on(authorActions.getAuthorsList, state => ({
    ...state
  })),
  on(authorActions.getAuthorsListSuccess, (state, action) => ({
    ...state,
    authors: action.authors
  })),


  on(authorActions.addAuthor, state => ({
    ...state
  })),
  on(authorActions.addAuthorSuccess, (state, authorAdded) => ({
    ...state,
    authors: [...state.authors, authorAdded]
  })),
  on(authorActions.addAuthorFailure, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage
  })),


  // on(authorActions.updateAuthor, state => ({
  //   ...state
  // })),
  // on(authorActions.updateAuthorSuccess, (state, action) => ({
  //   ...state,
  //   authors: state.authors.map(a => a.id === action.authorUpdated.id ? {
  //     ...a,
  //     author: action.authorUpdated
  //   }: a)
  // })),
  // on(authorActions.updateAuthorFailure, (state, action) => ({
  //   ...state,
  //   errorMessage: action.errorMessage
  // })),


  // on(authorActions.removeAuthor, state => ({
  //   ...state
  // })),
  // on(authorActions.removeAuthorSuccess, (state, action) => ({
  //   ...state,
  //   authors: [...state.authors, action.authorRemoved]
  // })),
  // on(authorActions.removeAuthorFailure, (state, action) => ({
  //   ...state,
  //   errorMessage: action.errorMessage
  // })),


  on(authorActions.deleteAuthor, (state, action) => ({
    ...state,
    selectedAuthor: state.authors.find(a => a.id === action.id)
  })),
  on(authorActions.deleteAuthorSuccess, state => ({
    ...state,
    authors: state.authors.filter(a => a.id != state.selectedAuthor.id)
  })),
  on(authorActions.deleteAuthorFailure, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage
  }))

)
