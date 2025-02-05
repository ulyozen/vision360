import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './core/services/app.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectIsAuthenticated, selectLanguage, selectTheme } from './core/store/header/header.selectors';
import { LanguageEnum, ThemeEnum } from './core/enums';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  theme$: Observable<ThemeEnum>
  language$: Observable<LanguageEnum>
  isAuthenticated$: Observable<boolean>

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private app: AppService
  ) {
    this.theme$ = this.store.select(selectTheme)
    this.language$ = this.store.select(selectLanguage)
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.language$.subscribe(language => this.app.applyLanguage(language))
    )
    this.subscriptions.add(
      this.theme$.subscribe(theme => this.app.applyTheme(theme))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
