import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/business/user.model';
import { LoginResponse } from '../models/api/response-models/login-response.model';
import { LoginRequest } from '../models/api/request-models/login-request.model';
import { RegisterRequest } from '../models/api/request-models/register-request.model';

const routes = {
  login: () => `http://localhost:3000/auth/login`,
  register: () => `http://localhost:3000/auth/register`
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(routes.login(), loginRequest);
  }

  register(registerRequest: RegisterRequest): Observable<User> {
    return this.http.post<User>(routes.register(), registerRequest);
  }

}
