// import { Student } from './../person';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket'
import { SportsComponent, Sports } from '../sports'
import { Student, PEOPLE } from '../person'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  sportEvents : Ticket[] = [];
  
  currStyles = {
    top: '20%',
    position: 'absolute',
    width: '100%'
  }

  constructor() { }

  ngOnInit() {
    var preventScrolling = document.createElement( "style" )
		preventScrolling.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;
    document.body.appendChild(preventScrolling)
    this.getAllEvents()
  }

  getTicketStr(ticket : Ticket) {
    return JSON.stringify(ticket)
  }

  getAllEvents() {
    fetch("http://localhost:3000/events", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(data => {
      data.forEach(element => this.sportEvents.push(element))
    })
  }

  updateHighestBid() {

  }

  updateUserBid() {

  }


  // majors = ['Computer Science', 'Electrical Engineering', 'Business', 'Biology']

  // selectedPerson : Student;
  // selectedMajor : string;

  // people : Student[] = PEOPLE;


  // setSelected(person : Student) {
  //   this.selectedPerson = person;
  //   console.log(this.selectedMajor)
  //   this.currStyles['backgroundColor'] = 'blue'
  // }

}
