import { createAction, props } from '@ngrx/store';
import { AuthState } from './auth.state';

export const setAuthMessage = createAction(
  '[Auth] Set Message',
  props<Pick<AuthState, 'message'>>()
)

export const cleanAuthMessage = createAction(
  '[Auth] Clean Message'
)
