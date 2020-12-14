import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountState, ACCOUNT_REDUCER_NODE } from './account.reducer';

const getAccountFeature = createFeatureSelector<AccountState>(ACCOUNT_REDUCER_NODE)


export const getAuthStatus = createSelector(
  getAccountFeature,
  state => state.isLoggedIn
)

export const getSignedUpStatus = createSelector(
  getAccountFeature,
  state => state.isSignedUp
)

export const getPasswordResetStatus = createSelector(
  getAccountFeature,
  state => state.isPasswordReset
)

export const getConfrimEmailStatus = createSelector(
  getAccountFeature,
  state => state.isEmailConfirmed
)

export const getAuthMessage = createSelector(
  getAccountFeature,
  state => state.errorMessage.error
)

export const getAuthData = createSelector(
  getAccountFeature,
  state => state.authData
)

export const getRoleSelector = createSelector(
  getAccountFeature,
  state => state.authData.role
)

export const getUserIdSelector = createSelector(
  getAccountFeature,
  state => state.authData.id
)




