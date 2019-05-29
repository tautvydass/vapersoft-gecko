import { Component, OnInit, Input } from '@angular/core';
import { GroupTrip } from '../../models/group-trip';
import { IComment } from '../../models/comment';
import { CommentViewModel } from 'src/app/view-models/comment-view-model';

@Component({
  selector: 'event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  @Input()
  groupTrip: GroupTrip;

  expanded: boolean = true;
  showComments: boolean = false;
  preshowComments: boolean = false;

  commentViewModel: CommentViewModel = null;

  constructor() { }

  ngOnInit() {
    this.commentViewModel = {
      groupTripId: this.groupTrip.id,
      comments: this.groupTrip.comments
    };
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
