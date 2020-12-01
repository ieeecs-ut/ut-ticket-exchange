import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../ticket'
import { SportsComponent, Sports } from '../sports'
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  
  @Input() ticketVal : string;

  // currTicket : Ticket = {
  //   id: 3,
  //   sport: Sports.Football,
  //   day: 14,
  //   month: 8,
  //   year: 2020,
  //   price: 43.95,
  //   collegeOne: "UT Austin",
  //   collegeTwo: "Texas A&M",
  //   time: "3:15",
  //   location: "Texas A&M Stadium"
  // }

  currTicket : Ticket;


  constructor() { 
    // console.log(this.ticketVal)
    // this.currTicket = JSON.parse(this.ticketVal)
  }



  ngOnInit() {
    console.log(this.ticketVal)
    this.currTicket = JSON.parse(this.ticketVal)
  }

}
