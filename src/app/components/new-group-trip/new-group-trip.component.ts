import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Office } from 'src/app/models/office';
import { UserService } from 'src/app/services/user/user.service';
import { MemberViewModel } from 'src/app/view-models/member-view-model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'new-group-trip',
  templateUrl: './new-group-trip.component.html',
  styleUrls: ['./new-group-trip.component.css']
})
export class NewGroupTripComponent implements OnInit {

  loading: boolean = true;

  users: User[];

  availableUsers: User[];

  offices: Office[];

  members: MemberViewModel[] = [];

  isFormValid: boolean = false;

  memberCount: number = 0;

  constructor(
    private userService: UserService) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.availableUsers = users;
    }, error => {
      console.log(error.message);
    }, () => {
      this.loading = false;
    })
    // TODO: get office services
  }

  addMember(): void {
    if (isNullOrUndefined(this.availableUsers) || this.availableUsers.length === 0 || this.members.length >= this.users.length) {
      return;
    }
    var member: MemberViewModel = {
      index: this.memberCount++,
      users: this.availableUsers,
      selectedUser: null,
      containsDetails: false
    };
    this.members.push(member);
  }

  addAndUpdateUsers(user: User): void {
    this.availableUsers.push(user);
    this.updateUsers();
  }

  updateUsers(): void {
      this.members.forEach(member => member.users = this.availableUsers);
  }

  onUserSelected(user: User): void {
    this.availableUsers = this.availableUsers.filter(u => u.id !== user.id);
    this.updateUsers();
  }

  removeMember(memberToRemove: MemberViewModel): void {
    this.members = this.members.filter(member => member.index !== memberToRemove.index);
    if (!isNullOrUndefined(memberToRemove.selectedUser)) {
      this.availableUsers.push(memberToRemove.selectedUser);
      this.updateUsers();
    }
  }
}
