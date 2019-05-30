import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisedGroupTripViewComponent } from './organised-group-trip-view.component';

describe('OrganisedGroupTripViewComponent', () => {
  let component: OrganisedGroupTripViewComponent;
  let fixture: ComponentFixture<OrganisedGroupTripViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisedGroupTripViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisedGroupTripViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
