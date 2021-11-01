import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  emailAddress : string;
  newPassword : string;
  password : string;

  registerMode : boolean;
  showErrorMsg : boolean;
  errorMessageVal : string;
  authenticated : boolean;
  globals : any;


  constructor(public gl: Globals) {
    this.globals = gl;
    this.registerMode = false;
    this.showErrorMsg = false;
    this.errorMessageVal = "Error during sign-in/sign-up.";
    this.emailAddress = "";
    this.newPassword = "";
    this.password = "";
    this.authenticated = false;
  }

  ngOnInit() {
    this.registerMode = true;

    this.globals.exc.authenticate((result, error) => {
      if (error != null || !result.hasOwnProperty('email')) {
        this.authenticated = false;
        // console.error('Authentication Error:', error.message ? error.message : error);
      } else {
        this.authenticated = true;
        // console.log("authenticated as " + result.email);
        window.location.href = `${window.location.protocol}//${window.location.host}/`;
      }
    });
  }

  signInButtonClick() {
    // console.log("sign in", this.emailAddress, this.password);
    if (this.emailAddress.trim().length >= ("_@utexas.edu").length) {
      if (this.password.trim().length > 0) {
        this.globals.exc.sign_in(this.emailAddress, this.password, (token, error) => {
          // console.log(token, error);
          if (error != null) {
            if (error.message != null)
              this.showError(`${error.message}.`);
            else this.showError("Sign In failed.");
          } else {
            this.hideError();
            this.globals.exc.login(token);
          }
        });
      } else this.showError("Invalid password.");
    } else this.showError("Invalid UT email address.");
  }

  signUpButtonClick() {
    // console.log("sign up", this.emailAddress, this.newPassword);
    if (this.emailAddress.trim().length >= ("_@utexas.edu").length) {
      if (this.newPassword.trim().length > 0) {
        this.globals.exc.sign_up(this.emailAddress, this.newPassword, (token, error) => {
          // console.log(token, error);
          if (error != null) {
            if (error.message != null)
              this.showError(`${error.message}.`);
            else this.showError("Sign Up failed.");
          } else {
            this.hideError();
            this.globals.exc.login(token);
          }
        });
      } else this.showError("Invalid new password.");
    } else this.showError("Invalid UT email address.");
  }

  viewSignIn() {
    // console.log(this.registerMode);
    this.registerMode = false;
    this.hideError();
    // console.log(this.registerMode);
  }

  viewSignUp() {
    // console.log(this.registerMode);
    this.registerMode = true;
    this.hideError();
    // console.log(this.registerMode);
  }

  showError(msgVal : string = this.errorMessageVal) {
    this.errorMessageVal = msgVal;
    this.showErrorMsg = true;
  }

  hideError() {
    this.showErrorMsg = false;
  }
}
