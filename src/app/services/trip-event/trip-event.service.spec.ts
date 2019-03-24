import { TestBed } from '@angular/core/testing';

import { TripEventService } from './trip-event.service';

describe('TripEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripEventService = TestBed.get(TripEventService);
    expect(service).toBeTruthy();
  });
});
