import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Globals } from '../globals';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  globals : any;
  innerHeight: any;

constructor(public gl: Globals) {
    // console.log(window.innerWidth)
    // console.log(history.state)
    // console.log(history.state[1])

    this.globals = gl;
    this.globals.loginPageLoaded = true;
    // console.log('login page loaded');

    this.innerHeight = window.innerHeight;

    var preventScrolling = document.createElement( "style" )
		preventScrolling.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;
    document.body.appendChild(preventScrolling);
  }

  // routeContact : boolean = history.state[1] === 'c';
  routeContact : boolean = (window.location.pathname.split('/')[1] === 'contact');
  // window.location.pathname.split('/')[1]

  getBackgroundStyles() {
    let styles = {
      'backgroundImage': 'url(../../assets/stadium_aerial.jpg)',
      'width': window.innerWidth + 'px',
      'height': window.innerHeight + 'px',
      'cover': 'fit',
      'background-size': 'cover',
      'margin-right': 'auto',
      "backgroundRepeat": 'no-repeat'
    }
    return styles;
  }
  
  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}
