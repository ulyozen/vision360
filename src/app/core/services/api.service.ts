import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://api.vision360.kz'

  readonly auth = {
    signup: `${this.baseUrl}/auth/signup`,
    signin: `${this.baseUrl}/auth/signin`,
    refreshToken: `${this.baseUrl}/auth/refresh-token`
  }
}
