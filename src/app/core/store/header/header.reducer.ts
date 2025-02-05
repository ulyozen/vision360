import { createReducer, on } from '@ngrx/store';
import { updateState } from '../common/ngrx-helpers';

import { HeaderState, initialHeaderState } from './header.state';
import { setAuthenticated, setLanguage, setTheme, setUnauthenticated } from './header.actions';

export const headerReducer = createReducer(
  initialHeaderState,

  on(setTheme, updateState<HeaderState>()),

  on(setLanguage, updateState<HeaderState>()),

  on(setAuthenticated, (state) => ({
    ...state,
    isAuthenticated: true
  })),

  on(setUnauthenticated, (state) => ({
    ...state,
    initialHeaderState: false
  }))
)
