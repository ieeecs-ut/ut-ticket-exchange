import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsButtonComponent } from './contact-us-button.component';

describe('ContactUsButtonComponent', () => {
  let component: ContactUsButtonComponent;
  let fixture: ComponentFixture<ContactUsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
