import { Ticket } from './../ticket';
import { selectCurrTicket, State } from './../reducers/index';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-bidding-modal',
  templateUrl: './bidding-modal.component.html',
  styleUrls: ['./bidding-modal.component.css']
})
export class BiddingModalComponent implements OnInit {

  @Input() info : string;

  ticketStr : Ticket;

  constructor(private store : Store<State>) {
    // console.log(store)
    let val = this.store.select(state => state.ticket).forEach((element) => this.ticketStr = element.currBid)
    // console.log(this.store.select(state => state.ticket))
    console.log("test")
  }

  body : string = "i am testing this to see if it works"

  ngOnInit() { }

  getSport(index : number) {
    const arrSports = ["Football", "Volleyball", "Baseball", "Basketball", "Athletics"]
    return arrSports[index-1]
  }

}
