import { createReducer, on } from '@ngrx/store';

import { AppState } from '../states/app-state';
import * as accountActions from 'src/app/store/account/account.actions';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/app/services/account.service';
import { AuthData } from 'src/app/models/auth-data';
import { JwtHelperService } from '@auth0/angular-jwt';

export const ACCOUNT_REDUCER_NODE = 'account'

const authData: AuthData = new JwtHelperService().decodeToken(localStorage.getItem(ACCESS_TOKEN_KEY))

function loggedInState(){
  if(new JwtHelperService().isTokenExpired(localStorage.getItem(ACCESS_TOKEN_KEY))){
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    return false
  }
  return true
}

export interface AccountState extends AppState{
  isLoggedIn: boolean
  isSignedUp: boolean
  isEmailConfirmed: boolean
  isPasswordReset: boolean
  authData: AuthData
  errorMessage: any
}

export const initialAccountState: AccountState = {
  isLoggedIn: loggedInState(),
  isSignedUp: false,
  isEmailConfirmed: false,
  isPasswordReset: false,
  authData: loggedInState() ? authData : null,
  errorMessage: null
}

export const accountReducer = createReducer(
  initialAccountState,
  on(accountActions.signIn, state => ({
    ...state
  })),
  on(accountActions.signInSuccess, (state, action) =>({
    ...state,
    isLoggedIn: true,
    authData: action.authData
  })),
  on(accountActions.signInFailure, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage
  })),
  on(accountActions.singUp, state => ({
    ...state
  })),
  on(accountActions.signUpSuccess, state => ({
    ...state,
    isSignedUp: true,
  })),
  on(accountActions.signUpFailure, (state, action) => ({
    ...state,
    isSignedUp: false,
    errorMessage: action.errorMessage
  })),
  on(accountActions.confirmEmail, state => ({
    ...state
  })),
  on(accountActions.confirmEmailSuccess, state => ({
    ...state,
    isEmailConfirmed: true
  })),
  on(accountActions.confirmEmailFailure, state => ({
    ...state,
    isEmailConfirmed: false
  })),
  on(accountActions.signOut, state => ({
    ...state,
    isLoggedIn: false,
    isSignedUp: false,
    isEmailConfirmed: false,
    isPasswordReset: false,
    AuthData: null,
    message: null
  })),
  on(accountActions.forgetPassword, state => ({
    ...state
  })),
  on(accountActions.forgetPasswordSuccess, state => ({
    ...state,
    isPasswordReset: true
  })),
  on(accountActions.forgetPasswordFailure, (state, action) => ({
    ...state,
    isPasswordReset: false,
    errorMessage: action.errorMessage
  }))
);
