import { Ticket } from './../ticket';
import { Action } from '@ngrx/store';

export enum TicketBidActionTypes {
  LoadTicketBids = '[TicketBid] Load TicketBids',
  
}

export class TicketAction implements Action {
  type: string;
  payload: {
    info: Ticket
  }
}

export class LoadTicketBids implements Action {
  readonly type = TicketBidActionTypes.LoadTicketBids;
}


export type TicketBidActions = LoadTicketBids;
