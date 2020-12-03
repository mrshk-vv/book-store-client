import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Author } from 'src/app/models/author/author';
import * as authorActions from 'src/app/store/author/author.actions';

import { AppState } from '../states/app-state';

export const AUTHOR_REDUCER_NODE = 'author'

export interface AuthorState extends AppState, EntityState<Author>{
  selectedAuthor: Author,
  error: undefined
}

export const authorAdapter: EntityAdapter<Author> = createEntityAdapter<Author>()

export const initialAuthorState = authorAdapter.getInitialState({
  selectedAuthor: null,
  pageNumber: 1,
  pageSize: 6,
  nextPage: null,
  previousPage: null,
  error: null
})

export const authorReducer = createReducer(
  initialAuthorState,

  on(authorActions.getAuthorsSuccess, (state, action) =>
    authorAdapter.setAll(action.data, {
      ...state,
      pageNumber: action.pageNumber,
      pageSize: action.pageSize,
      nextPage: action.nextPage,
      previousPage: action.previousPage,
    })
  ),
  on(authorActions.getAuthorsFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(authorActions.getAuthorSuccess, (state, action) => {
    return{
      ...state,
      selectedPrintingEdition: action.author
    }
  }),
  on(authorActions.getAuthorFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(authorActions.addAuthorSuccess, (state, action) =>
    authorAdapter.addOne(action.authorAdded, state)
  ),
  on(authorActions.addAuthorFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(authorActions.updateAuthorSuccess, (state, action) =>
    authorAdapter.updateOne(action.authorUpdated, state)
  ),
  on(authorActions.updateAuthorFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(authorActions.deleteAuthor, (state, action) => {
    return{
      ...state,
      selectedAuthor: state.entities[action.id]
    }
  }),
  on(authorActions.deleteAuthorSuccess, state =>
  authorAdapter.removeOne(state.selectedAuthor.id, state)
  ),
  on(authorActions.deleteAuthorFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  })
)

export const { selectAll } = authorAdapter.getSelectors()
