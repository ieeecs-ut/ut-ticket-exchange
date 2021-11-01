import { stringify } from 'querystring';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  colorStyles;
  globals : any;
  authenticated : boolean;
  showExchangeButton : boolean;

  constructor(public gl: Globals) {
    this.globals = gl;
    this.authenticated = false;
    this.showExchangeButton = true;
  }



  ngOnInit() {
    this.colorStyles = {
      1: true,
      2: false,
      3: false
    }


    if (this.globals.loginPageLoaded == true) {
      let buttonElem : any = document.querySelector("#contactUsNavButton .navButtonLink");
      if (buttonElem != null && (window.location.pathname.split('/')[1] === 'contact')) {
        setTimeout((_ => {
          if (this.globals.contactPageLoaded === false) {
            this.globals.contactPageLoaded = true;
            buttonElem.click();
          }
        }).bind(this), 150);
      }
    }

    this.globals.exc.authenticate((result, error) => {
      if (error != null || !result.hasOwnProperty('email')) {
        this.authenticated = false;
        this.showExchangeButton = false;
        console.error('Authentication Error:', error.message ? error.message : error);
      } else {
        this.authenticated = true;
        this.showExchangeButton = true;
        console.log("authenticated as " + result.email);
      }
    });
  }

  printColor(num : number) {
    this.colorStyles[1] = false
    this.colorStyles[2] = false
    this.colorStyles[3] = false
    this.colorStyles[num] = true
  }

  getHomeColor() {
    return this.colorStyles[1]
  }

  getDashboardColor() {
    return this.colorStyles[2]
  }

  getContactColor() {
    return this.colorStyles[3]
  }
}
