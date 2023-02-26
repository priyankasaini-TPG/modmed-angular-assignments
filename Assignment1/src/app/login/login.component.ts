import { Component, Input } from '@angular/core';
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

  constructor(private user: UserService){

  }

  onClick(){
    console.log(this.username);
    console.log(this.password);

    if(this.username === this.user.loginUserName && this.password === this.user.loginPassword){
      this.user.userShow = false;
    }
    else{
      console.log("You entered wrong Username or Password!")
    }

  }
}

