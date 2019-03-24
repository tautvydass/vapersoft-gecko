import { Component, OnInit, Input } from '@angular/core';
import { TripEvent } from '../../models/trip-event';
import { Status } from '../../models/enums/status';

@Component({
  selector: 'event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  constructor() { }

  @Input() event: TripEvent;

  ngOnInit() {
  }

  getBackgroundColor() {
    switch(this.event.status) {
      case Status.pending:
        return { "background-color": "#e6d398" };
      case Status.rejected:
        return { "background-color": "#e69898" };
      case Status.approved:
        return { "background-color": "#99e699" };
      case Status.archived:
        return { "background-color": "#a6a6a6" };
    }
  }

}
