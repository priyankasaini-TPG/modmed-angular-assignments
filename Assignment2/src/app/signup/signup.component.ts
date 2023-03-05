import { Component } from '@angular/core';
import { ISignUp } from 'src/data-type';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signupService: SignupService){

  }

  signUp(data: ISignUp){
    console.log(data);
    this.signupService.postSignupData(data).subscribe((result)=>{
      console.log("Data has been sent to the server..");
      console.log(data);
    })
  }
}
