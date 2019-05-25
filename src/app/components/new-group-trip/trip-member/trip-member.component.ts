import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MemberViewModel } from 'src/app/view-models/member-view-model';
import { User } from 'src/app/models/user';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'trip-member',
  templateUrl: './trip-member.component.html',
  styleUrls: ['./trip-member.component.css']
})
export class TripMemberComponent implements OnInit {

  @Input()
  viewModel: MemberViewModel;

  @Output()
  onRemove: EventEmitter<MemberViewModel> = new EventEmitter();

  @Output()
  onSelected: EventEmitter<User> = new EventEmitter();

  model: any;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor() { }

  ngOnInit() {
    
  }

  remove(): void {
    this.onRemove.emit(this.viewModel);
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.viewModel.users : this.viewModel.users.filter(user => user.fullname.toLowerCase().indexOf(term.toLowerCase()) > -1)).map(user => user.fullname).slice(0, 10))
    );
  }

  onUserSelected(selected: any): void {
    this.viewModel.selectedUser = this.viewModel.users.find(user => user.fullname === selected.item);
    this.onSelected.emit(this.viewModel.selectedUser);
  }

  getCheckboxId(): number {
    return this.viewModel.index;
  }

}
