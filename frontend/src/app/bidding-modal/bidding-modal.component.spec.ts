import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BiddingModalComponent } from './bidding-modal.component';

describe('BiddingModalComponent', () => {
  let component: BiddingModalComponent;
  let fixture: ComponentFixture<BiddingModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
