import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './shared/header/services/signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router){

  }

  ngOnInit(){
    this.router.navigate(['/welcome-screen']);
  }


}
