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

  constructor(public gl: Globals) {
    this.globals = gl;
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
        setTimeout(_ => {
          buttonElem.click();
        }, 150);
      }
    }
  }

  printColor(num : number) {
    console.log("printing color...")
    console.log(num)
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
