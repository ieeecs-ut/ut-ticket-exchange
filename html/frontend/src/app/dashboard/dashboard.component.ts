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

  thisTicket : Ticket = {
    id: 3,
    sport: Sports.Football,
    day: 14,
    month: 8,
    year: 2020,
    price: 43.75,
    collegeOne: "UT Austin",
    collegeTwo: "Texas A&M",
    time: "3:15",
    location: "Texas A&M Stadium"
  }

  getTicketStr(ticket : Ticket) {
    return JSON.stringify(ticket)
  }

  currTicket : string = JSON.stringify(this.thisTicket)

  majors = ['Computer Science', 'Electrical Engineering', 'Business', 'Biology']

  selectedPerson : Student;
  selectedMajor : string;

  people : Student[] = PEOPLE;

  currStyles = {
    top: '25%',
    position: 'absolute',
    width: '100%'
  }

  constructor() { 
    var preventScrolling = document.createElement( "style" )
		preventScrolling.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;
    document.body.appendChild(preventScrolling)
    console.log("hi")
    console.log(this.currTicket)
  }

  ngOnInit() {
  }


  setSelected(person : Student) {
    console.log("person seleccted")
    this.selectedPerson = person;
    console.log(this.selectedMajor)
    this.currStyles['backgroundColor'] = 'blue'
  }

  changeMajors() {
    console.log("Change majors")
    console.log()
  }

}
