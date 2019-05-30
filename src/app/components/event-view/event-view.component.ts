import { Component, OnInit, Input } from '@angular/core';
import { GroupTrip } from '../../models/group-trip';
import { IComment } from '../../models/comment';
import { CommentViewModel } from 'src/app/view-models/comment-view-model';
import { DateFormatterService } from 'src/app/services/date-formatter.service';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { TripService } from 'src/app/services/trip/trip.service';
import { GroupTripViewModel } from 'src/app/view-models/group-trip-view-model';

@Component({
  selector: 'event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  @Input()
  viewModel: GroupTripViewModel;

  expanded: boolean = true;
  showComments: boolean = false;
  preshowComments: boolean = false;

  commentViewModel: CommentViewModel = null;

  dateFrom: string;
  dateTo: string;

  constructor(
    private dateFormatter: DateFormatterService) { }

  ngOnInit() {
    this.commentViewModel = {
      groupTripId: this.viewModel.groupTrip.id,
      comments: this.viewModel.groupTrip.comments.reverse()
    };

    this.dateFrom = this.dateFormatter.formatDate(this.viewModel.groupTrip.dateFrom);
    this.dateTo = this.dateFormatter.formatDate(this.viewModel.groupTrip.dateTo);
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
    return this.viewModel.groupTrip.comments ? this.viewModel.groupTrip.comments.length : 0;
  }

  getStatus(): string {
    return this.viewModel.groupTrip.status;
  }

  getAdvisorFullname(): string {
    return this.viewModel.groupTrip.advisor.fullname;
  }
}
