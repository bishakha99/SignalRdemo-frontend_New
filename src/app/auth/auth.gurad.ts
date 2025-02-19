import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';


//3Tutorial
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthServiceService) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.authService.router.navigateByUrl("auth");
      return false;
    }
    return true;
  }
}