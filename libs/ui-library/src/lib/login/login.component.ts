import { AuthService } from '@pets/core-data';
import { NotifyService } from '@pets/core-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@pets/api-interfaces';

@Component({
  selector: 'pets-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User;
  userInfo = { email: 'm@m.com', password: 'pass' };
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notify: NotifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  login(): any {
    const inputedUser: User = this.form.value;
    this.notify.notification('Invalid User');
    if (this.form.invalid) {
      return false;
    } else {
      if (
        inputedUser.email === this.userInfo.email &&
        inputedUser.password === this.userInfo.password
      ) {
        this.authService.setToken(inputedUser.email);
        this.notify.notification(
          `${this.user.name} has successfully logged in`
        );
        this.router.navigate(['/dogs']);
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
}
