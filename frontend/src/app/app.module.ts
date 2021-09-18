/* app module */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactmodalComponent } from './contactmodal/contactmodal.component';
import { MainButtonsComponent } from './main-buttons/main-buttons.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { GameCardComponent } from './game-card/game-card.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { BiddingModalComponent } from './bidding-modal/bidding-modal.component';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BiddingModalComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BiddingModalComponent, GameCardComponent]
})
export class AppModule { }
