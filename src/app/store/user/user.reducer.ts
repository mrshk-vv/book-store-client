import { createEntityAdapter } from '@ngrx/entity';
import { EntityAdapter, EntityState, EntityStateAdapter } from '@ngrx/entity/src/models';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user/user';
import { AppState } from '../states/app-state';

import * as userActions from "src/app/store/user/user.actions";

export const USER_REDUCER_NODE = 'user'

export interface UserState extends AppState, EntityState<User>{
  selectedUser: User,
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>()

export const initialUserState = userAdapter.getInitialState({
  selectedUser: null,
  pageNumber: 1,
  pageSize: 6,
  nextPage: null,
  previousPage: null,
  error: null
})

export const userReducer = createReducer(
  initialUserState,
  on(userActions.getUserSuccess, (state, action) => {
    return{
      ...state,
      selectedUser: action.user
    }
  }),
  on(userActions.getUserFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(userActions.getUsersSuccess, (state, action) =>
    userAdapter.setAll(action.data, {
      ...state,
      pageNumber: action.pageNumber,
      pageSize: action.pageSize,
      nextPage: action.nextPage,
      previousPage: action.previousPage,
    })
  ),
  on(userActions.getUsersFailure, (state, action) =>{
    return{
      ...state,
      error: action.error
    }
  }),

  on(userActions.editUserSuccess, (state, action) =>
    userAdapter.updateOne(action.userEdited, state)
  ),
  on(userActions.editUserFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(userActions.changeUserBlockStatusSuccess, (state, action) =>
    userAdapter.updateOne(action.user, state)
  ),
  on(userActions.changeUserBlockStatusFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(userActions.deleteUser, (state, action) => {
    return{
      ...state,
      selectedUser: state.entities[action.id]
    }
  }),
  on(userActions.deleteUserSuccess, (state, action) =>
    userAdapter.removeOne(state.selectedUser.id, state)
  ),
  on(userActions.deleteUserFailure, (state, action)=>{
    return{
      ...state,
      error: action.error
    }
  })
)

export const { selectAll } = userAdapter.getSelectors()
