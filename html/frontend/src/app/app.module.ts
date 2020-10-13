import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsButtonComponent } from './contact-us-button/contact-us-button.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { ContactmodalComponent } from './contactmodal/contactmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    ContactUsButtonComponent,
    HomeButtonComponent,
    ContactmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
