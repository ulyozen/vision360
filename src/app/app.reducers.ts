import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {headerReducer} from './core/store/header/header.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  header: headerReducer,
}
