import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupTripComponent } from './new-group-trip.component';

describe('NewGroupTripComponent', () => {
  let component: NewGroupTripComponent;
  let fixture: ComponentFixture<NewGroupTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGroupTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
