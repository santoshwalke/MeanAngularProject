import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  baseUrl: string = environment.baseUrl;
  token: string;
  message: string;

  signIn(request: {email: string, password: string}) {
    const { email, password } = request;
    this.httpClient.post(`${this.baseUrl}/login`, {
    email,
    password
    })
    .subscribe((data: {status: string, message: string, token?: string}) => {
        if (data.status) {
            this.token = data.token;
            this.message = data.message;
            this.router.navigate(['/recipes']);
        } else {
            this.message = data.message;
        }
    });
  }

  signUp(request: {email: string, password: string}) {
    const { email, password } = request;
    this.httpClient.post(`${this.baseUrl}/registration`, {
        email,
        password
    })
    .subscribe((data: {message: string, status: string}) => {
        const {message, status} = data;
        if (status) {
            this.message = message;
        } else {
            this.message = message;
        }
    });
  }

  getToken() {
      return this.token;
  }

  isAuthenticated() {
      return this.token !== null;
  }
}
