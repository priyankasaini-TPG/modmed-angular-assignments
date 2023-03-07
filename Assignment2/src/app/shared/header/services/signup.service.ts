import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ILogin, ISignUp } from '../../data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

    SHOWLOGIN: boolean;

    showHomeScreen: boolean = false;
    isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  postSignupData(data: ISignUp){
    this.showHomeScreen = false;
    this.http.post('http://localhost:3000/signup',data, { observe: 'response'}).subscribe((result) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('signup',JSON.stringify(result.body));
        this.router.navigate(['/admin-setting']);
        this.showHomeScreen = true;
    });

  }

  reloadSignup(){
    this.showHomeScreen = false;
    if(localStorage.getItem('signup')){
      this.isLoggedIn.next(true);
      this.router.navigate(['/admin-setting']);
      this.showHomeScreen = true;

    }
  }

  userLogin(data: ILogin){
    this.showHomeScreen = false;
    console.log(data);
    this.http.get(`http://localhost:3000/signup?email=${data.email}&password=${data.password}`, { observe: 'response'}).subscribe((result: any) => {
      console.warn(result);
      if(result && result.body && result.body.length){
        console.log("user logged in.");
        localStorage.setItem('signup',JSON.stringify(result.body));
        this.router.navigate(['/admin-setting']);
        this.showHomeScreen = true;

      }
      else{
        console.log("Login failed. :-(");
        this.isLoginError.emit(true);
      }
    });
  }


}
