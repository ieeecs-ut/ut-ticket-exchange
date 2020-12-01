import { stringify } from 'querystring';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  constructor() { }

  colorStyles = {
    1: true,
    2: false,
    3: false
  }

  ngOnInit() {
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
