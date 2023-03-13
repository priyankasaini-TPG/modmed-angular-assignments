import { AfterContentChecked, Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterContentChecked, DoCheck{

  menuType: string ;
  adminName: string = '';
  showAdmin: boolean = false;
  
  constructor(private signupService: SignupService, private router: Router){

  }

  ngOnInit(): void{
    this.router.events.subscribe((value: any) => {
      if(value.url && !value.url.includes('/welcome-screen') || !value.url.includes('/sign-up')){
        this.showAdmin = true;
      }
      else {
        this.showAdmin = false;
      }
    })
  }

  ngDoCheck(){
    this.adminName = this.signupService.adminName;
  }

  ngAfterContentChecked(): void{
    this.menuType = this.signupService.userType;
  }

  logout(){
    this.signupService.logoutUser();
  }

  userLoggedIn(){
    return localStorage.getItem('signup-user')
  }

  adminLoggedIn(){
    return localStorage.getItem('signup-admin')
  }

}
