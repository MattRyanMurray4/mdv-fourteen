import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NotifyService } from '../notifications/notify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notify: NotifyService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated$.value) {
      this.notify.notification('Invalid User');
      return false;
    }
    return true;
  }
}
