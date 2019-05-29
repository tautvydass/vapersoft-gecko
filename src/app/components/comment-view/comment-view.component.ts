import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../models/comment';

@Component({
  selector: 'comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent implements OnInit {

  @Input()
  comment: IComment;

  constructor() { }

  ngOnInit() {
  }

}
