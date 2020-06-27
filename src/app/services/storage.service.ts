import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { User } from '../models/business/user.model';
import { Router } from '@angular/router';
import { Token } from '../models/business/token.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isAuthenticated() {
    let retVal = false;
    if (localStorage.getItem('token')) {
      const token = from(localStorage.getItem('token'));
      token.subscribe((res) => {
        if (res) { retVal = true; }
      });
      token.subscribe();
    }
    return retVal;
  }

  getToken() {
    const token: Token =  JSON.parse(localStorage.getItem('token'));
    console.log(token.accessToken);
    return token.accessToken;
  }

  setCurrentUser(user: any, token: string) {
    this.user = user;
    localStorage.setItem('token',  JSON.stringify(token));
  }

  logout() {
    localStorage.clear();
  }

}
