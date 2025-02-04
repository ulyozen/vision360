import {createAction, props} from '@ngrx/store';
import {HeaderState} from './header.state';

export const setTheme = createAction(
  '[Header] Set Theme',
  props<Pick<HeaderState, 'theme'>>()
)

export const setLanguage = createAction(
  '[Header] Set Language.ts',
  props<Pick<HeaderState, 'language'>>()
)

export const setAuthenticated = createAction(
  '[Header] Set Authenticated'
)

export const setUnauthenticated = createAction(
  '[Header] Set Unauthenticated'
)
