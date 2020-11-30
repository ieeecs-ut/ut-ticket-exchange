import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  constructor() { 
    // console.log(window.innerWidth)
    // console.log(history.state)
    // console.log(history.state[1])
    var preventScrolling = document.createElement( "style" )
		preventScrolling.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;
    document.body.appendChild(preventScrolling)
  }

  routeContact : boolean = history.state[1] === 'c';

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
  
  ngOnInit() { }
}
