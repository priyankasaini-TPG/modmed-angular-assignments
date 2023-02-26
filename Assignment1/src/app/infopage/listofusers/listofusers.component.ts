import { Component, DoCheck} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listofusers',
  templateUrl: './listofusers.component.html',
  styleUrls: ['./listofusers.component.css'],
})

export class ListofusersComponent implements DoCheck {
  users: string[] = [];
  loginItem: string = "";

  constructor(private userService: UserService){

  }

  ngDoCheck(){
    this.users = this.userService.usersArray;
    console.log(this.users);
  }

  onAdd(loginItem: string){
    this.userService.userAdded(loginItem);
  }

}
