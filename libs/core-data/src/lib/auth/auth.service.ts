import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);

  setToken(token: string) {
    localStorage.setItem('user_Token', token);
    this.isAuthenticated$.next(!!token);
  }

  getToken() {
    return localStorage.getItem('user_Token');
  }

  logout() {
    this.setToken('');
  }
}
