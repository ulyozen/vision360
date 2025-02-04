import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HeaderState} from './header.state';

export const selectHeaderState = createFeatureSelector<HeaderState>('header')

export const selectTheme = createSelector(
  selectHeaderState,
  state => state.theme
)

export const selectLanguage = createSelector(
  selectHeaderState,
  state => state.language
)

export const selectIsAuthenticated = createSelector(
  selectHeaderState,
  state => state.isAuthenticated
)
