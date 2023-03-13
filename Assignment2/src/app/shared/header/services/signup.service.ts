import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ILogin, ISignUp } from '../../data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  showHomeScreen: boolean = false;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  userType: string = '';
  adminName: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  postSignupData(data: ISignUp) {
    this.showHomeScreen = false;
    this.http.post(`http://localhost:3000/signup-${this.userType}`, data, { observe: 'response' }).subscribe((result) => {
      this.isLoggedIn.next(true);
      this.setAdminName();
      localStorage.setItem(`signup-${this.userType}`, JSON.stringify(result.body));
      this.showHomeScreen = true;
    });
  }

  reloadSignup() {
    this.showHomeScreen = false;
    if (localStorage.getItem(`signup-${this.userType}`)) {
      this.isLoggedIn.next(true);
      this.setAdminName();
      if (this.userType === 'admin') {
        this.router.navigate(['/admin-setting']);
      }
      else {
        this.router.navigate(['/homescreen']);
      }
      this.showHomeScreen = true;
    }
  }

  userLogin(data: ILogin) {
    this.showHomeScreen = false;
    console.log(data);
    this.http.get(`http://localhost:3000/signup-${this.userType}?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length) {
        console.log("user logged in.");
        this.isLoggedIn.next(true);
        this.setAdminName();
        localStorage.setItem(`signup-${this.userType}`, JSON.stringify(result.body));
        if (this.userType === 'admin') {
          this.router.navigate(['/admin-setting']);
        }
        else {
          this.router.navigate(['/homescreen']);
        }
        this.showHomeScreen = true;
      }
      else {
        console.log("Login failed. :-(");
        this.isLoginError.emit(true);
      }
    });
  }

  logoutUser() {
    localStorage.removeItem(`signup-${this.userType}`);
    this.isLoggedIn.next(false);
    this.router.navigate(['/sign-up']);
  }

  setAdminName(){
    if (localStorage.getItem(`signup-${this.userType}`)) {
      let admin = localStorage.getItem(`signup-${this.userType}`);
      let adminData = admin && JSON.parse(admin);
      this.adminName = adminData[0].username;
    }
  }
  
}
