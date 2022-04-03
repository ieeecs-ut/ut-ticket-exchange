// import { Student } from './../person';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  
  currStyles = {
    top: '20%',
    position: 'absolute',
    width: '100%'
  }

  globals : any;
  innerHeight: any;
  
  constructor(public gl: Globals) {
    this.globals = gl;
    this.innerHeight = window.innerHeight;
  }

  ngOnInit() {

    this.innerHeight = window.innerHeight;

    var preventScrolling = document.createElement( "style" )
		preventScrolling.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;
    document.body.appendChild(preventScrolling)
    this.getAllEvents();

    this.globals.exc.authenticate((result, error) => {
      if (error != null || !result.hasOwnProperty('email')) {
        console.error('Authentication Error:', error.message ? error.message : error);
        window.location = this.globals.exc.get_landing_url();
      } else {
        console.log("authenticated as " + result.email);
      }
    });
  }

  getAllEvents() {
    // fetch("http://localhost:3000/events", {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(res => res.json()).then(data => {
    //   data.forEach(element => this.sportEvents.push(element))
    // })
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
