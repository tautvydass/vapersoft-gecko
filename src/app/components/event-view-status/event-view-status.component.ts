import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event-view-status',
  templateUrl: './event-view-status.component.html',
  styleUrls: ['./event-view-status.component.css']
})
export class EventViewStatusComponent implements OnInit {

  @Input() status: string;
  @Input() advisorFullname: string;

  constructor() { }

  ngOnInit() {
  }

  getDisplayStatus(): string {
    return this.status.toLowerCase();
  }
}
