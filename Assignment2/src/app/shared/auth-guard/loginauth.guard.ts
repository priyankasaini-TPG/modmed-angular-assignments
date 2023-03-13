import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupService } from '../header/services/signup.service';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {

  constructor(private signupService: SignupService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem(`signup-${this.signupService.userType}`)) return true;
    return this.signupService.isLoggedIn;
  }
  
}
