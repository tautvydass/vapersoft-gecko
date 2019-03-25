import { Component, OnInit, Input } from '@angular/core';
import { TripEvent } from '../../models/trip-event';
import { Status } from '../../models/enums/status';

@Component({
  selector: 'event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  @Input() event: TripEvent;

  expanded: boolean = false;
  showComments: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  openDetails() {

  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

}
