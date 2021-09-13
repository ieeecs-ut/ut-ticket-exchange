import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-buttons',
  templateUrl: './main-buttons.component.html',
  styleUrls: ['./main-buttons.component.css']
})
export class MainButtonsComponent implements OnInit {
  @Input() route: string;
  @Input() buttonName: string;
  @Input() currColor: string;

  constructor() { }

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




  ngOnInit() {
  }

}
