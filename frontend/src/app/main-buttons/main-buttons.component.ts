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
  globals : any;

  constructor(public gl: Globals) { this.globals = gl; }

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
  }

  ngOnInit() {
  }

}
