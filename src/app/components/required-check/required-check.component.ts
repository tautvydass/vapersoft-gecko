import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'required-check',
  templateUrl: './required-check.component.html',
  styleUrls: ['./required-check.component.css']
})
export class RequiredCheckComponent implements OnInit {

  @Input()
  value: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
