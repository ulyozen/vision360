import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated, selectLanguage, selectTheme } from '../../store/header/header.selectors';
import { ThemeEnum, LanguageEnum } from '../../enums';
import { AppService } from '../../services/app.service';

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

  constructor(
    private store: Store,
    private app: AppService
  ) {
    this.theme$ = this.store.select(selectTheme)
    this.language$ = this.store.select(selectLanguage)
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  toggleTheme(theme: ThemeEnum) {
    this.app.applyTheme(theme);
  }

  changeLanguage(language: LanguageEnum) {
    this.app.applyLanguage(language);
  }

  logout() {
    // this.store.dispatch(logout());
  }
}
