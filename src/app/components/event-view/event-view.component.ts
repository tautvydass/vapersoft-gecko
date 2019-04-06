import { Component, OnInit, Input } from '@angular/core';
import { TripEvent } from '../../models/trip-event';
import { Status } from '../../models/enums/status';
import { IComment } from '../../models/comment';

@Component({
  selector: 'event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  @Input() event: TripEvent;

  expanded: boolean = false;
  showComments: boolean = false;
  preshowComments: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleExpanded() {
    if (this.expanded) {
      if (this.showComments) {
        this.toggleComments();
        this.preshowComments = true;
      } else {
        this.preshowComments = false;
      }
    } else {
      if (this.preshowComments) {
        this.showComments = true;
      }
    }

    this.expanded = !this.expanded;
  }

  openDetails() {

  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  getCommentCount(): number {
    return this.event.comments ? this.event.comments.length : 0;
  }

}
