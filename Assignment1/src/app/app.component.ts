import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements OnInit {
  title = 'Assignment1';
  appShow?: boolean;

  ngOnInit(){
    // this.appShow = const show;
  }
}
