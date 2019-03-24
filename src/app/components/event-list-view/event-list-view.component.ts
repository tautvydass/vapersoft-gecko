import { Component, OnInit } from '@angular/core';
import { TripEventService } from '../../services/trip-event/trip-event.service';
import { TripEvent } from '../../models/trip-event';

@Component({
  selector: 'event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})
export class EventListViewComponent implements OnInit {

  constructor(private eventService: TripEventService) { }

  events: TripEvent[];

  ngOnInit() {
    this.eventService.getEvents().subscribe((events: TripEvent[]) => {
      this.events = events;
    });
  }

}
