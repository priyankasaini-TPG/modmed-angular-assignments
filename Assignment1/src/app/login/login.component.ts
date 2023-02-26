import { Component, ContentChild, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  show?: boolean;
  message:boolean = false;

  constructor(private user: UserService){

  }

  onClick(){
    console.log(this.username);
    console.log(this.password);

    if(this.username === this.user.loginUserName && this.password === this.user.loginPassword){
      this.user.userShow = false;
      this.message = false;
    }
    else{
      console.log("You entered wrong Username or Password!");
      this.message = true;
    }

  }
}

