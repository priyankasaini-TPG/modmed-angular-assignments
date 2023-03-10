import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeMenuComponent } from "../homescreen/home-menu/home-menu.component";
import { HomescreenComponent } from "../homescreen/homescreen.component";
import { SignupComponent } from "../login/signup/signup.component";
import { CreateProductComponent } from "../product/create-product/create-product.component";
import { QuickCreateProductComponent } from "../product/quick-create-product/quick-create-product.component";
import { SettingComponent } from "../settings/setting/setting.component";
import { WelcomeScreenComponent } from "../welcome-screen/welcome-screen.component";
import { LoginauthGuard } from "./auth-guard/loginauth.guard";
import { ProductDetailsComponent } from "../product/product-details/product-details.component";


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
    },
    {
        path: "create-product",
        component: CreateProductComponent
    },
    {   
        path: "edit-product/:id",
        component: CreateProductComponent

    },
    {
        path: "quick-create-product",
        component: QuickCreateProductComponent
    },
    {
        path: "home-menu",
        component: HomeMenuComponent
    },
    {
        path: "product-details/:id",
        component: ProductDetailsComponent
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