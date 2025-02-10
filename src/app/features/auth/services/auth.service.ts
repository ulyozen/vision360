import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.vision360.kz/auth/signup'

  private http = inject(HttpClient)

  signup(user: User): Observable<UserResponse> {
   return this.http.post<UserResponse>(this.apiUrl, user)
  }

  signin(user: User) {

  }
}
