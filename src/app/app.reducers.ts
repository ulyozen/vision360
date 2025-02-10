import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { headerReducer } from './core/store/header/header.reducer';
import { authReducer } from './features/auth/store/auth.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  header: headerReducer,
  auth: authReducer,
}
