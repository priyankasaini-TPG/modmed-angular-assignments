import { Component, OnInit } from '@angular/core';
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

  constructor(private signupService: SignupService){

  }

  ngOnInit(): void {
    this.signupService.reloadSignup();
    
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

}
