import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  usernameModel: string = null;
  fullnameModel: string = null;
  passwordModel: string = null;
  repeatPasswordModel: string = null;
  emailModel: string = null;

  showError: boolean = false;
  errorMessage: string;

  emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  loading: boolean = false;

  @Output()
  onUserCreated: EventEmitter<User> = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(): void {
    if (!this.validate()) {
      return;
    }
    this.showError = false;
    this.loading = true;
    var user: User = {
      id: null,
      email: this.emailModel,
      fullname: this.fullnameModel,
      role: null
    };
    this.userService.registerUser(user, this.usernameModel, this.passwordModel).subscribe(newUser => {
      this.onUserCreated.emit(newUser);
      this.clearFields();
    }, error => {
      // TODO: handle error
    }, () => {
      this.loading = false;
    });
  }

  clearFields(): void {
    this.repeatPasswordModel = null;
    this.passwordModel = null;
    this.usernameModel = null;
    this.emailModel = null;
    this.fullnameModel = null;
  }

  filledIn(): boolean {
    return !isNullOrUndefined(this.usernameModel) && !isNullOrUndefined(this.fullnameModel) && !isNullOrUndefined(this.emailModel) && !isNullOrUndefined(this.passwordModel) && !isNullOrUndefined(this.repeatPasswordModel);
  }

  validate(): boolean {
    if (!this.filledIn()) {
      this.errorMessage = "Please fill in all the fields.";
      this.showError = true;
      return false;
    } else if (!this.emailRegex.test(this.emailModel)) {
      this.errorMessage = "Invalid email format.";
      this.showError = true;
      return false;
    } else if (this.passwordModel.length < 6) {
      this.errorMessage = "Password must be atleast 6 characters long.";
      this.showError = true;
      return false;
    } else if (this.passwordModel !== this.repeatPasswordModel) {
      this.errorMessage = "Passwords don't match";
      this.showError = true;
      return false;
    }

    return true;
  }

  closeAlert(): void {
    this.showError = false;
  }

}
