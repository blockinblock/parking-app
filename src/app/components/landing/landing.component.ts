import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  @ViewChild('f', { static: false }) signupForm!: NgForm;

  showAuthMsg = false;

  constructor(private router: Router, public authService: AuthService) {}

  public onSubmit(form: NgForm) {
    const username = form.form.value.username;
    const password = form.form.value.password;

    this.authService.login(username, password);
    this.router.navigate(['/parking']);
    this.showAuthMsg = !this.authService.loggedIn;
  }
}
