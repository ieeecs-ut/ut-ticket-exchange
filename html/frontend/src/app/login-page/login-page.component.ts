import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { 
    console.log(window.innerWidth);
  }

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
