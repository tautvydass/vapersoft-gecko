import { TestBed } from '@angular/core/testing';

import { GroupTripService } from './group-trip.service';

describe('GroupTripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupTripService = TestBed.get(GroupTripService);
    expect(service).toBeTruthy();
  });
});
