import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../ticket'
import { SportsComponent, Sports } from '../sports'

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  
  currTicket : Ticket = {
    id: 3,
    sport: Sports.Football,
    day: 14,
    month: 8,
    year: 2020,
    price: 43.95,
    collegeOne: "UT Austin",
    collegeTwo: "Texas A&M",
    time: "3:15 CST",
    location: "Texas A&M Stadium"
  }

  constructor() { }

  ngOnInit() {
  }

}
