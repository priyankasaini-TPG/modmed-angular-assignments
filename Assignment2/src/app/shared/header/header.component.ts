import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterContentChecked{

  menuType: string ;
  adminName: string = '';

  constructor(private signupService: SignupService, private router: Router){

  }

  ngAfterContentChecked(): void{
    this.menuType = this.signupService.menuType;
    this.adminName = this.signupService.adminName;
  }

  // ngOnInit(): void{
  //   this.menuType = this.signupService.userType;
  //   this.router.events.subscribe((val: any) => {
  //     if(val.url){
  //       console.warn(val.url);
  //       if(localStorage.getItem(`signup-${this.menuType}`) && val.url.includes('admin')){
  //         console.log("inside admin area signup");
  //         this.menuType = 'admin';
  //         if(localStorage.getItem(`signup-${this.menuType}`)){
  //           let admin = localStorage.getItem(`signup-${this.menuType}`);
  //           let adminData = admin && JSON.parse(admin);
  //           this.adminName = adminData.username+'(Admin)';
  //         }
  //       }
  //       else {
  //         console.log("outside admin area signup");
  //         this.menuType = 'user';
  //         let admin = localStorage.getItem(`signup-${this.menuType}`);
  //         let adminData = admin && JSON.parse(admin);
  //         this.adminName = adminData.username;
  //       }
  //     }
  //   });
  // }





}
