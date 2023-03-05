import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISignUp } from 'src/data-type';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent {

  next: boolean = false;

  constructor(private service: SignupService, private router: Router){

  }

  login(data){
    console.warn(data);
    console.log("Credintals have been checking..");

    this.service.getSignupData().subscribe((result)=>{
      console.log(result);
      for (const key in result) {
        if (result.hasOwnProperty(key)) {
          const element = result[key];
          console.log(element);
          if(data.username === element.username && data.password === element.password){
            this.next = true;
            console.log("Credinals matched.")
            this.router.navigate(['homescreen']);

          }
          else{
            console.log("userid or password does not match.")
          }
          
        }
      }
    });

    if(this.next){
    }
      
        
  }
  
}

