import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface AppState{
  pageNumber?: number
  pageSize?: number
  nextPage?: string
  previousPage?: string
  error?: any
}

export const reducers: ActionReducerMap<AppState> = {}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : []
