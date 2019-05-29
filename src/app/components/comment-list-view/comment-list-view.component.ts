import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../models/comment';
import { User } from 'src/app/models/user';
import { GroupTripService } from 'src/app/services/group-trip/group-trip.service';
import { CommentViewModel } from 'src/app/view-models/comment-view-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.css']
})
export class CommentListViewComponent implements OnInit {

  @Input()
  viewModel: CommentViewModel;

  loading: boolean = false;

  user: User;

  constructor(
    private groupTripService: GroupTripService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getCachedUser().subscribe(result => this.user = result);
  }

  addComment(value: string) {
    if (value && value !== '') {
      this.loading = true;
      const comment: IComment = {
        id: null,
        user: this.user,
        text: value,
        timestamp: null
      };
      this.groupTripService.addComment(this.viewModel.groupTripId, comment).subscribe(result => {
        if ((typeof result) === "string") {
          // TODO: handle error
          this.loading = false;
          return;
        } else {
          this.viewModel.comments.unshift(result);
        }
      }, error => {
        // TODO: handle error
      }, () => {
        this.loading = false;
      });
    }
  }

}
