import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://api.vision360.kz'
  // private readonly baseUrl = 'http://localhost:5016'

  readonly auth = {
    signup: `${this.baseUrl}/auth/signup`,
    signin: `${this.baseUrl}/auth/signin`,
    forgotPassword: `${this.baseUrl}/auth/forgot-password`,
    refreshToken: `${this.baseUrl}/auth/refresh-token`,
    logout: `${this.baseUrl}/auth/logout`
  }
}
