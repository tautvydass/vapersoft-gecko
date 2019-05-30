import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  constructor() { }

  formatDate(date: string): string {
    var values: string[] = date.split("-");
    return values[2] + " " + this.months[(+(values[1].trim())) - 1] + ", " + values[0];
  }
}
