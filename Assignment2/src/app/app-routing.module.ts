import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomescreenComponent } from "./loginscreen/homescreen/homescreen.component";


const appRoute: Routes = [
    {
        path: "homescreen",
        component: HomescreenComponent
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