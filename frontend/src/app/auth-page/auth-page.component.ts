import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  registerMode : boolean;

  constructor() {
    this.registerMode = false;
  }

  ngOnInit() {
    this.registerMode = true;
  }

  signInButtonClick() {
    console.log("sign in");
  }

  signUpButtonClick() {
    console.log("sign up");
  }

  viewSignIn() {
    console.log(this.registerMode);
    this.registerMode = false;
    console.log(this.registerMode);
  }

  viewSignUp() {
    console.log(this.registerMode);
    this.registerMode = true;
    console.log(this.registerMode);
  }

}
