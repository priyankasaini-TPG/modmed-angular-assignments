import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements DoCheck {
  appShow?: boolean;
  
  constructor(private user: UserService){

  }

  ngDoCheck(){
    this.appShow = this.user.userShow;
  }
}
