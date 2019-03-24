import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewStatusComponent } from './event-view-status.component';

describe('EventViewStatusComponent', () => {
  let component: EventViewStatusComponent;
  let fixture: ComponentFixture<EventViewStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
