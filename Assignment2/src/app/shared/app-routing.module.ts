import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomescreenComponent } from "../homescreen/homescreen.component";
import { SignupComponent } from "../login/signup/signup.component";
import { SettingComponent } from "../settings/setting/setting.component";
import { WelcomeScreenComponent } from "../welcome-screen/welcome-screen.component";
import { LoginauthGuard } from "./auth-guard/loginauth.guard";


const appRoute: Routes = [
    {
        path: "welcome-screen",
        component: WelcomeScreenComponent
    },
    {
        path: "sign-up",
        component: SignupComponent
    },
    {
        path: "homescreen",
        component: HomescreenComponent,
        // canActivate: [LoginauthGuard]
    },
    // {
    //     path: "admin-signup",
    //     component: SignupComponent
    // },
    {
        path: "admin-setting",
        component: SettingComponent,
        canActivate: [LoginauthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule{

}