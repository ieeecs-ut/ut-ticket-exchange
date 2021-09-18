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
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
// import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from '@auth0/auth0-angular';
import { BiddingModalComponent } from './bidding-modal/bidding-modal.component';
import { ModalModule } from 'angular-bootstrap-md'
import { NgbModule, NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    // ModalModule
    // FlexLayoutModule
    AuthModule.forRoot({
      domain: 'dev-t18v2qg3.us.auth0.com',
      clientId: 'N3yiZjcwmSQaHgmBK0ill0JVp90ygkq3'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BiddingModalComponent, GameCardComponent]
})
export class AppModule { }
