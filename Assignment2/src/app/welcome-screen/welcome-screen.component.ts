import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupComponent } from '../login/signup/signup.component';
import { SignupService } from '../shared/header/services/signup.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent {


  constructor(private signupService: SignupService, private router: Router){

  }

  onChange(event){
    this.signupService.userType = event.target.value;
    this.router.navigate(['/sign-up']);
  }

}
