import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SignupComponent } from './login/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './shared/app-routing.module';
import { SettingComponent } from './settings/setting/setting.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { HamburgerComponent } from './shared/hamburger/hamburger.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { QuickCreateProductComponent } from './product/quick-create-product/quick-create-product.component';
import { HomeMenuComponent } from './homescreen/home-menu/home-menu.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    HomescreenComponent,
    SettingComponent,
    WelcomeScreenComponent,
    HamburgerComponent,
    CreateProductComponent,
    QuickCreateProductComponent,
    HomeMenuComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
