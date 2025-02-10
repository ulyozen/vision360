import { cleanAuthMessage, setAuthMessage } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import { updateState } from '../../../core/store/common/ngrx-helpers';

export const authReducer = createReducer(
  initialAuthState,

  on(setAuthMessage, updateState<AuthState>()),

  on(cleanAuthMessage, state => ({ ...state, message: null }))
)
