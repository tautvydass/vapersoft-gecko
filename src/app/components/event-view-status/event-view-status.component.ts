import { Component, OnInit, Input } from '@angular/core';
import { Status } from '../../models/enums/status';

@Component({
  selector: 'event-view-status',
  templateUrl: './event-view-status.component.html',
  styleUrls: ['./event-view-status.component.css']
})
export class EventViewStatusComponent implements OnInit {

  @Input() status: Status;
  @Input() advisorFullname: string;

  constructor() { }

  ngOnInit() {
  }

  getStatus(): string {
    return this.status.toString();
  }

  getDisplayStatus(): string {
    return this.status.toString().toLowerCase();
  }
}
