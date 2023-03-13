import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, ISignUp } from 'src/app/shared/data-types';
import { SignupService } from 'src/app/shared/header/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  showLogin: boolean = false;
  authError: string = '';
  userType: string = '';
  username = '';
  password = '';
  email = '';

  constructor(private signupService: SignupService, private router: Router){

  }

  ngOnInit(): void {
    this.signupService.reloadSignup();
    this.userType = this.signupService.userType;  
  }

  signUp(data: ISignUp){
    console.log(data);
    this.signupService.postSignupData(data);
  }

  login(data: ILogin){
    this.authError = '';
    console.warn(data);
    this.signupService.userLogin(data);
    this.signupService.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Email or password is not correct.";
      }
    });
  }

  switch(type: string){
    if(this.userType === 'admin'){
      this.signupService.userType = 'user';
      this.userType = 'user';
    }
    else {
      this.signupService.userType = 'admin';
      this.userType = 'admin';
    }
    if(localStorage.getItem(`signup-${this.userType}`)){
      if(this.userType === 'admin')
        this.router.navigate(['/admin-setting']);
      else 
        this.router.navigate(['/homescreen']); 
    }
  }  

}
