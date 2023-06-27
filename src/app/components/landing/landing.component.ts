import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('f', { static: false }) signupForm: NgForm;

  public showAuthMsg = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    const username = form.form.value.username;
    const password = form.form.value.password;

    this.authService.login(username, password);
    this.router.navigate(['/parking']);
    this.showAuthMsg = !this.authService.loggedIn;
  }
}
