import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './core/services/app.service';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated, selectLanguage, selectTheme } from './core/store/header/header.selectors';
import { LanguageEnum, ThemeEnum } from './core/enums';
import { AuthService } from './features/auth/services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader = true;
  theme$: Observable<ThemeEnum>
  language$: Observable<LanguageEnum>
  isAuthenticated$: Observable<boolean>

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router,
    private app: AppService,
    private auth: AuthService,
  ) {
    this.theme$ = this.store.select(selectTheme)
    this.language$ = this.store.select(selectLanguage)
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.showHeader = !['/auth/signin', '/auth/signup', '/auth/forgot-password'].includes(event.url)
        }
      })
    )
    this.subscriptions.add(
      this.theme$.subscribe(theme => this.app.applyTheme(theme))
    )
    this.subscriptions.add(
      this.language$.subscribe(language => this.app.applyLanguage(language))
    )
    this.subscriptions.add(
      this.isAuthenticated$.subscribe(() => this.auth.restoreSession())
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
