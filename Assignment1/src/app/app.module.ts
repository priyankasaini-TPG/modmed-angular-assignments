import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InfopageComponent } from './infopage/infopage.component';
import { ListofusersComponent } from './infopage/listofusers/listofusers.component';
import { FormComponent } from './infopage/form/form.component';
import { RouterModule, Routes } from '@angular/router';


const appRoute: Routes = [
  {path:"infopage", component: InfopageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfopageComponent,
    ListofusersComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    [RouterModule.forRoot(appRoute)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
