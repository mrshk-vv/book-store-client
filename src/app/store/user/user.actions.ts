import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { PagedResponce } from 'src/app/models/common/paged-responce';
import { PaginationQuery } from 'src/app/models/common/pagination-query';
import { UserFilter } from 'src/app/models/filters/user.filter';
import { User } from 'src/app/models/user/user';
import { UserSignUp } from 'src/app/models/user/user-sign-up';

export enum UserActions{
  GET_USER = "[User] Get User",
  GET_USER_SUCCESS = "[User] Get User Success",
  GET_USER_FAILURE = "[User] Get User Failure",

  GET_USERS = "[User] Get Users",
  GET_USERS_SUCCESS = "[User] Get Users Success",
  GET_USERS_FAILURE = "[User] Get Users Failure",

  EDIT_USER = "[User] Edit User",
  EDIT_USER_SUCCESS = "[User] Edit User Success",
  EDIT_USER_FAILURE = "[User] Edit User Failure",

  CHANGE_USER_BLOCK_STATUS = "[User] Change User Block status  User",
  CHANGE_USER_BLOCK_STATUS_SUCCESS = "[User] Change User Block status Success",
  CHANGE_USER_BLOCK_STATUS_FAILURE = "[User] Change User Block status  Failure",

  DELETE_USER = "[User] Delete User",
  DELETE_USER_SUCCESS = "[User] Delete User Success",
  DELETE_USER_FAILURE = "[User] Delte User Failure"
}

export const getUser = createAction(
  UserActions.GET_USER,
  props<{id: string}>()
)

export const getUserSuccess = createAction(
  UserActions.GET_USER_SUCCESS,
  props<{user: User}>()
)

export const getUserFailure = createAction(
  UserActions.GET_USER_FAILURE,
  props<{error: any}>()
)

export const getUsers = createAction(
  UserActions.GET_USERS,
  props<{paginationQuery?: PaginationQuery,filter?: UserFilter}>()
)

export const getUsersSuccess = createAction(
  UserActions.GET_USERS_SUCCESS,
  props<PagedResponce>()
)

export const getUsersFailure = createAction(
  UserActions.GET_USERS_FAILURE,
  props<{error: any}>()
)

export const editUser = createAction(
  UserActions.EDIT_USER,
  props<{userToEdit: UserSignUp}>()
)

export const editUserSuccess = createAction(
  UserActions.EDIT_USER_SUCCESS,
  props<{userEdited: Update<User>}>()
)

export const editUserFailure = createAction(
  UserActions.EDIT_USER_FAILURE,
  props<{error: any}>()
)

export const changeUserBlockStatus = createAction(
  UserActions.CHANGE_USER_BLOCK_STATUS,
  props<{id: string}>()
)

export const changeUserBlockStatusSuccess = createAction(
  UserActions.CHANGE_USER_BLOCK_STATUS_SUCCESS,
  props<{user: Update<User>}>()
)

export const changeUserBlockStatusFailure = createAction(
  UserActions.CHANGE_USER_BLOCK_STATUS_FAILURE,
  props<{error: any}>()
)

export const deleteUser = createAction(
  UserActions.DELETE_USER,
  props<{id: string}>()
)

export const deleteUserSuccess = createAction(
  UserActions.DELETE_USER_SUCCESS
)

export const deleteUserFailure = createAction(
  UserActions.DELETE_USER_FAILURE,
  props<{error: any}>()
)
