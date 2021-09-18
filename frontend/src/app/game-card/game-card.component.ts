import { TicketAction, TicketBidActions, TicketBidActionTypes } from './../actions/ticket-bid.actions';
import { BiddingModalComponent } from './../bidding-modal/bidding-modal.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../ticket'
import { SportsComponent, Sports } from '../sports'
import { tick } from '@angular/core/testing';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'angular-bootstrap-md'
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
  providers: []
})
export class GameCardComponent implements OnInit {
  
  @Input() ticketVal : string;
  // @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;

  currTicket : Ticket;

  constructor(private store : Store<any>) {
    
    // console.log(this.ticketVal)
    // this.currTicket = JSON.parse(this.ticketVal)
  }

  ngOnInit() {
    // console.log(this.ticketVal)
    this.currTicket = JSON.parse(this.ticketVal)
  }

  dispatchData() {
    let currAction : TicketAction = {
      type: TicketBidActionTypes.LoadTicketBids,
      payload: {
        info: this.currTicket
      }
    }
    this.store.dispatch(currAction)
    // console.log("hello")
  }

  // openModal() {
  //   const modalRef = this.modalService.open(BiddingModalComponent,
  //     {
  //       scrollable: true,
  //       windowClass: 'BiddingModalComponent',
  //       // keyboard: false,
  //       // backdrop: 'static'
  //     });

  //   let data = {
  //     prop1: 'Some Data',
  //     prop2: 'From Parent Component',
  //     prop3: 'This Can be anything'
  //   }

  //   modalRef.componentInstance.fromParent = data;
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   }, (reason) => {
  //   });
  // }

}
