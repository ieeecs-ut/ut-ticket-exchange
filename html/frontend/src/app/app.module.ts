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
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';
import { BiddingModalComponent } from './bidding-modal/bidding-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    ContactmodalComponent,
    MainButtonsComponent,
    NavBarComponent,
    AuthPageComponent,
    GameCardComponent,
    BiddingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    // FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
