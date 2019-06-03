import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTripModalComponent } from './join-trip-modal.component';

describe('JoinTripModalComponent', () => {
  let component: JoinTripModalComponent;
  let fixture: ComponentFixture<JoinTripModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinTripModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTripModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
