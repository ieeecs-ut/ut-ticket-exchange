import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-main-buttons',
  templateUrl: './main-buttons.component.html',
  styleUrls: ['./main-buttons.component.css']
})
export class MainButtonsComponent implements OnInit {
  @Input() route: string;
  @Input() buttonName: string;
  @Input() currColor: string;
  blockViewLoadDelay : number;
  globals : any;

  constructor(public gl: Globals) {
    this.globals = gl;
    this.blockViewLoadDelay = gl.exc.blockViewLoadDelay;
  }

  getBackgroundColor() {
    let color = this.currColor ? '#BF5700' : 'white'
    // console.log(color)
    // console.log(this.currColor)
    let buttonStyle = {
      'backgroundColor': color,
      // 'text-decoration': 'none',
      // border: 'none',
      // padding: '0em',
      // 'font-size': '20px',
      // 'font-family':'Trebuchet MS',
      // 'font-weight': 'bold',
      // 'margin-left': '1em',
    }
    return buttonStyle
  }

  linkOnClick() {
    // console.log(this.route);
    if (this.route == '/contact') {
      this.globals.contactPageLoaded = true;
    }
    if ((`${this.buttonName}`).trim() == "Exchange") {
      setTimeout(_ => {
        this.globals.exc.reload_view();
      }, this.blockViewLoadDelay);
    } else {
      this.globals.exc.hide_view();
    }
  }

  ngOnInit() {
  }

}
