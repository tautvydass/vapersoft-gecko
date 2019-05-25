import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMemberComponent } from './trip-member.component';

describe('TripMemberComponent', () => {
  let component: TripMemberComponent;
  let fixture: ComponentFixture<TripMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
