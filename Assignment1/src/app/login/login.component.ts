import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  loginUserName: string = "Priyankasaini";
  loginPassword: string = "12345";

  // show: boolean = true;

  onClick(){
    console.log(this.username);
    console.log(this.password);

    // if(this.username === this.loginUserName && this.password === this.loginPassword){
    //   this.show = false;
    }
  }

