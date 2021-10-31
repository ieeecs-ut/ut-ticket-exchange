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

  constructor(public gl: Globals) {
    this.globals = gl;
  }
  
  doStuff() {
    // this.globals.exc.go();
  }
}