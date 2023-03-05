import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { HomescreenComponent } from './loginscreen/homescreen/homescreen.component';
import { SettingsComponent } from './loginscreen/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginscreenComponent,
    HomescreenComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
