import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {setAuthenticated, setLanguage, setTheme, setUnauthenticated} from '../store/header/header.actions';
import { ThemeEnum } from '../enums/Theme';
import { LanguageEnum } from '../enums/Language';
import {StorageKeys} from '../enums/StorageKeys';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private store = inject(Store)

  loadTheme() {
    const savedTheme = localStorage.getItem(StorageKeys.Theme) as ThemeEnum | null;
    const theme = savedTheme || ThemeEnum.Light;
    this.store.dispatch(setTheme({ theme }))
  }

  loadLanguage() {
    const savedLanguage = localStorage.getItem(StorageKeys.Language) as LanguageEnum | null;
    const language = savedLanguage || LanguageEnum.English;
    this.store.dispatch(setLanguage({ language }))
  }

  // TODO: http request for checking access token for authentication
  loadAuthentication() {
    const isAuthenticated = localStorage.getItem(StorageKeys.IsAuthenticated) === 'true';
    isAuthenticated
      ? this.store.dispatch(setAuthenticated())
      : this.store.dispatch(setUnauthenticated())
  }
}
