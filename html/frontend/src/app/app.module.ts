import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactmodalComponent } from './contactmodal/contactmodal.component';
import { MainButtonsComponent } from './main-buttons/main-buttons.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { GameCardComponent } from './game-card/game-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    ContactmodalComponent,
    MainButtonsComponent,
    NavBarComponent,
    AuthPageComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
