import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements DoCheck {
  title = 'Assignment1';
  appShow?: boolean;
  
  constructor(private user: UserService){

  }

  ngDoCheck(){
    this.appShow = this.user.userShow;
  }
}
