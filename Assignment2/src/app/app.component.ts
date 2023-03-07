import { Component } from '@angular/core';
import { SignupService } from './shared/header/services/signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private signupService: SignupService){

  }

  showHomescreen = this.signupService.showHomeScreen;


}
