import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmodalComponent } from './contactmodal.component';

describe('ContactmodalComponent', () => {
  let component: ContactmodalComponent;
  let fixture: ComponentFixture<ContactmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
