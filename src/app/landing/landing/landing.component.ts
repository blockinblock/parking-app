import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  form = this.fb.group({
    username: '',
    password: '',
  });

  notAuthorisedMsg = 'You are not authorised!';
  showAuthMsg = false;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    const username = this.form.value.username || '';
    const password = this.form.value.password || '';

    this.authService.login(username, password);
    this.router.navigate(['/parking']);
    this.showAuthMsg = !this.authService.loggedIn;
  }
}
