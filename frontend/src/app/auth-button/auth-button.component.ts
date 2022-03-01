// import { Component } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';


// @Component({
//   selector: 'app-auth-button',
//   templateUrl: './auth-button.component.html',
//   styleUrls: ['./auth-button.component.css']
// })
// export class AuthButtonComponent {
//   constructor(public auth: AuthService) {}
// }

import { Component, Inject } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

import { Globals } from '../globals';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent {
  // constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  
  globals : any;
  authenticated : boolean;
  authButtonText : string;
  authButtonRoute : string;

  constructor(public gl: Globals) {
    this.globals = gl;
    this.authenticated = false;
    this.authButtonText = "Sign In / Sign Up";
  }
  
  doStuff() {
    // this.globals.exc.go();
  }

  ngOnInit() {
    this.globals.exc.authenticate((result, error) => {
      if (error != null || !result.hasOwnProperty('email')) {
        this.authenticated = false;
        this.authButtonRoute = "/auth";
        this.authButtonText = "Sign In / Sign Up";
        console.error('Authentication Error:', error.message ? error.message : error);
      } else {
        this.authenticated = true;
        this.authButtonRoute = "/exchange";
        this.authButtonText = "Enter Exchange";
        console.log("authenticated as " + result.email);
      }
    });
  }

  authButtonClick() {
    setTimeout(_ => {
        this.globals.exc.reload_view();
      }, this.globals.exc.blockViewLoadDelay);
  }
}