import { Component } from '@angular/core';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showLogin: boolean;
 constructor(private signupService: SignupService){

 }

 ngOnCheck(){
  this.showLogin = this.signupService.SHOWLOGIN;
 }



}
