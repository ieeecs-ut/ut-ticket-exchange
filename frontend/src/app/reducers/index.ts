import { LoadTicketBids, TicketAction, TicketBidActions, TicketBidActionTypes } from './../actions/ticket-bid.actions';
import { Ticket } from './../ticket';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface TicketState {
  currBid : Ticket| null;
}

const initialTicketState : TicketState = {
  currBid: null
}

export interface State {
  ticket : TicketState;
}

export function biddingReducer(state : TicketState = initialTicketState, action : TicketAction) : TicketState {
  switch (action.type) {
    case TicketBidActionTypes.LoadTicketBids:
      return {
        currBid: action.payload.info,
      };

    default:
      return state
  }
}

export const reducers: ActionReducerMap<State> = {
  ticket: biddingReducer
};

export const selectCurrTicket = (state : State) => state.ticket.currBid;
// export const selectTicketState = createFeatureSelector()
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
