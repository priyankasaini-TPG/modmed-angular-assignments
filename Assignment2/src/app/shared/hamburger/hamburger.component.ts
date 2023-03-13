import { Component, OnInit } from '@angular/core';
import { SignupService } from '../header/services/signup.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit{

  userType: string = '';

  constructor(private signupService: SignupService){

  }

  ngOnInit():void {
    this.userType =this.signupService.userType;
  }
}
