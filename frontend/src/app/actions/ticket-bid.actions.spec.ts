import * as TicketBidActions from './ticket-bid.actions';

describe('TicketBid', () => {
  it('should create an instance', () => {
    expect(new TicketBidActions.LoadTicketBids()).toBeTruthy();
  });
});
