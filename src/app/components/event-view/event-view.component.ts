import { Component, OnInit, Input } from '@angular/core';
import { GroupTrip } from '../../models/group-trip';
import { Status } from '../../models/enums/status';
import { IComment } from '../../models/comment';

@Component({
  selector: 'event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  @Input() groupTrip: GroupTrip;

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
    return this.groupTrip.comments ? this.groupTrip.comments.length : 0;
  }

  getStatus(): string {
    return this.groupTrip.status;
  }

  getAdvisorFullname(): string {
    return this.groupTrip.advisor.fullname;
  }
}
