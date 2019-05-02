import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

//Services
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (
    private router:Router,
    private authService:AuthService
  ) { }

  canActivate() {
    if(!this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/profile']);
      return false;
    }
  }
}