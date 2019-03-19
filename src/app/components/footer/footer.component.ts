import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  copyright = "© Vapersoft";
  version = "v0.0.1";

  constructor() { }

  ngOnInit() {
  }

}
