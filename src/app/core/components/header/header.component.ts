import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setLanguage, setTheme } from '../../store/header/header.actions';
import { selectIsAuthenticated, selectLanguage, selectTheme } from '../../store/header/header.selectors';
import { ThemeEnum } from '../../enums/Theme';
import { LanguageEnum } from '../../enums/Language';
import {StorageKeys} from '../../enums/StorageKeys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent {
  theme$: Observable<ThemeEnum>
  language$: Observable<LanguageEnum>
  isAuthenticated$: Observable<boolean>

  protected readonly ThemeEnum = ThemeEnum;
  protected readonly LanguageEnum = LanguageEnum;

  constructor(private store: Store) {
    this.theme$ = this.store.select(selectTheme)
    this.language$ = this.store.select(selectLanguage)
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  toggleTheme(theme: ThemeEnum) {
    this.store.dispatch(setTheme({ theme }))
    localStorage.setItem(StorageKeys.Theme, theme)
  }

  changeLanguage(language: LanguageEnum) {
    this.store.dispatch(setLanguage({ language }))
    localStorage.setItem(StorageKeys.Language, language)
  }

  logout() {
    // this.store.dispatch(logout());
  }


}
