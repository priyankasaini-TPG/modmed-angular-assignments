import { Component } from '@angular/core';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent {
  login(data: object){
    console.warn(data);
  }
}
