import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, interval, map, Observable, Subscription, switchMap, take, throwError } from 'rxjs';

import { User, UserResponse } from '../models/User';
import { ApiService } from '../../../core/services/api.service';
import { setAuthenticated, setUnauthenticated } from '../../../core/store/header/header.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshSubscription: Subscription | null = null

  private store = inject(Store)
  private http = inject(HttpClient)
  private api = inject(ApiService)

  signup(user: User): Observable<UserResponse> {
   return this.http.post<UserResponse>(this.api.auth.signup, user)
  }

  signin(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.api.auth.signin, user)
  }

  refreshToken(): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.api.auth.refreshToken, {}, { withCredentials: true })
      .pipe(
        map(response => {
          if (response.success) {
            this.saveAccessToken(response.token!.accessToken, response.token!.expiresIn)
            this.store.dispatch(setAuthenticated())
          }

          return response
        }),
        catchError(error => {
          this.logout()
          return throwError(() => error)
        })
      )
  }

  saveAccessToken(accessToken: string, expiresIn: number): void {
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('tokenExpiration', expirationTime.toString())

    this.scheduleRefreshToken(expiresIn)
  }

  restoreSession(): void {
    const accessToken = localStorage.getItem('accessToken')
    const tokenExpiration = Number(localStorage.getItem('tokenExpiration'))

    if (!accessToken || !tokenExpiration) {
      this.store.dispatch(setUnauthenticated())
      return
    }

    const timeUntilExpiration = tokenExpiration - Date.now()

    if (timeUntilExpiration > 0) {
      this.store.dispatch(setAuthenticated())
      this.scheduleRefreshToken(timeUntilExpiration / 1000)
    } else {
      this.refreshToken().subscribe()
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenExpiration')

    this.refreshSubscription?.unsubscribe()
    this.refreshSubscription = null

    this.store.dispatch(setUnauthenticated())
    window.location.href = '/'
  }

  private scheduleRefreshToken(expiresIn: number): void {
    const timeUntilRefresh = (expiresIn * 1000) - 10000

    this.refreshSubscription?.unsubscribe()

    this.refreshSubscription = interval(timeUntilRefresh)
      .pipe(take(1), switchMap(() => this.refreshToken()))
      .subscribe()
  }
}
