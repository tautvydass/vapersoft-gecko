import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisedTripsListViewComponent } from './organised-trips-list-view.component';

describe('OrganisedTripsListViewComponent', () => {
  let component: OrganisedTripsListViewComponent;
  let fixture: ComponentFixture<OrganisedTripsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisedTripsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisedTripsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
