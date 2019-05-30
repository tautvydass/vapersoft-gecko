import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupTripComponent } from './edit-group-trip.component';

describe('EditGroupTripComponent', () => {
  let component: EditGroupTripComponent;
  let fixture: ComponentFixture<EditGroupTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
