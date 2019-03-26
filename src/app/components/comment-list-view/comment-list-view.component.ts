import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../models/comment';

@Component({
  selector: 'comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.css']
})
export class CommentListViewComponent implements OnInit {

  @Input() comments: IComment[];

  constructor() { }

  ngOnInit() {
  }

}
