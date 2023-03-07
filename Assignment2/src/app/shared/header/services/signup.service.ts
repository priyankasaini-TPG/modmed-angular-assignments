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
    menuType: string = '';
    adminName: string = '';




  constructor(private http: HttpClient, private router: Router) { }

  postSignupData(data: ISignUp){
    this.showHomeScreen = false;
    this.http.post(`http://localhost:3000/signup-${this.userType}`,data, { observe: 'response'}).subscribe((result) => {
        this.isLoggedIn.next(true);
        localStorage.setItem(`signup-${this.userType}`,JSON.stringify(result.body));
        if(this.userType === 'admin') this.router.navigate(['/admin-setting']);
        else this.router.navigate(['/homescreen']);
        this.showHomeScreen = true;
    });
    this.changeHeader();

  }

  reloadSignup(){
    this.showHomeScreen = false;
    if(localStorage.getItem(`signup-${this.userType}`)){
      this.isLoggedIn.next(true);
      if(this.userType === 'admin') this.router.navigate(['/admin-setting']);
      else this.router.navigate(['/homescreen']);
      this.showHomeScreen = true;
      this.changeHeader();


    }
  }

  userLogin(data: ILogin){
    this.showHomeScreen = false;
    console.log(data);
    this.http.get(`http://localhost:3000/signup-${this.userType}?email=${data.email}&password=${data.password}`, { observe: 'response'}).subscribe((result: any) => {
      console.warn(result);
      if(result && result.body && result.body.length){
        console.log("user logged in.");
        localStorage.setItem(`signup-${this.userType}`,JSON.stringify(result.body));
        if(this.userType === 'admin') this.router.navigate(['/admin-setting']);
        else this.router.navigate(['/homescreen']);
        this.showHomeScreen = true;
      }
      else{
        console.log("Login failed. :-(");
        this.isLoginError.emit(true);
      }
    });
    this.changeHeader();
  }

  changeHeader(){
    this.menuType = this.userType;
    this.router.events.subscribe((val: any) => {
      if(val.url){
        console.warn(val.url);
        if(localStorage.getItem(`signup-${this.menuType}`) && val.url.includes('admin')){
          console.log("inside admin area signup");
          this.menuType = 'admin';
          if(localStorage.getItem(`signup-${this.menuType}`)){
            let admin = localStorage.getItem(`signup-${this.menuType}`);
            let adminData = admin && JSON.parse(admin);
            this.adminName = adminData.username+'(Admin)';
          }
        }
        else {
          console.log("outside admin area signup");
          this.menuType = 'user';
          let admin = localStorage.getItem(`signup-${this.menuType}`);
          let adminData = admin && JSON.parse(admin);
          this.adminName = adminData.username;
        }
      }
    });
}


}
