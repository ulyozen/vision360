import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { setLanguage, setTheme } from '../store/header/header.actions';
import { LanguageEnum, StorageKeys, ThemeEnum } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private store = inject(Store)
  private language = inject(TranslateService)

  applyTheme(theme: ThemeEnum) {
    const html = document.documentElement;
    html.classList.remove(ThemeEnum.Light, ThemeEnum.Dark);
    html.classList.add(`${theme}`);

    this.store.dispatch(setTheme({theme}));
    localStorage.setItem(StorageKeys.Theme, theme);
  }

  applyLanguage(language: LanguageEnum) {
    this.language.use(language)
    this.store.dispatch(setLanguage({language}))
    localStorage.setItem(StorageKeys.Language, language)
  }
}
