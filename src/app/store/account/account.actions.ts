import { createAction, props } from '@ngrx/store';
import { AuthData } from 'src/app/models/AuthData';
import { Token } from 'src/app/models/Token';
import { User } from 'src/app/models/User';

export enum AccountActions{
  SIGN_UP = '[Account] Sign Up',
  SIGN_UP_SUCCESS = '[Account] Sign Up Success',
  SIGN_UP_FAILURE = '[Account] Sign Up Failure',

  SIGN_IN = '[Account] Sign In',
  SIGN_IN_SUCCESS = '[Account] Sign In Success',
  SIGN_IN_FAILURE = '[Account] Sign In Failure',

  FORGET_PASSWORD = '[Account] Forget Password',
  FORGET_PASSWORD_SUCCESS = '[Account] Forget Password Success',
  FORGET_PASSWORD_FAILURE = '[Account] Forget Failure',

  CONFIGM_EMAIL = '[Account] Confirm Email',
  CONFIRM_EMAIL_SUCCESS = '[Account] Confirm Email Success',
  CONFIRM_EMAIL_FAILURE = '[Account] Confirm Email Failure',

  REFRESH_TOKENS = '[Account] Refresh Tokens',

  SIGN_OUT = '[Account] Sign Out',
}

export const signIn = createAction(AccountActions.SIGN_IN, props<{email: string, password: string}>())
export const signInSuccess = createAction(AccountActions.SIGN_IN_SUCCESS, props<AuthData>())
export const signInFailure = createAction(AccountActions.SIGN_IN_FAILURE, props<{errorMessage: string}>())

export const singUp = createAction(AccountActions.SIGN_UP, props<User>())
export const signUpSuccess = createAction(AccountActions.SIGN_UP_SUCCESS)
export const signUpFailure = createAction(AccountActions.SIGN_UP_FAILURE, props<{errorMessage: string}>())

export const forgetPassword = createAction(AccountActions.FORGET_PASSWORD, props<{email: string}>())
export const forgetPasswordSuccess = createAction(AccountActions.FORGET_PASSWORD_SUCCESS)
export const forgetPasswordFailure = createAction(AccountActions.FORGET_PASSWORD_FAILURE, props<{errorMessage: string}>())

export const confirmEmail = createAction(AccountActions.CONFIGM_EMAIL, props<{email: string, code: string}>())
export const confirmEmailSuccess = createAction(AccountActions.CONFIRM_EMAIL_SUCCESS)
export const confirmEmailFailure = createAction(AccountActions.CONFIRM_EMAIL_FAILURE, props<{errorMessage: string}>())

export const refreshTokens = createAction(AccountActions.REFRESH_TOKENS, props<Token>())

export const signOut = createAction(AccountActions.SIGN_OUT)
