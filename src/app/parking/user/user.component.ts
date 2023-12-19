import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { AuthService } from '../../landing/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  isSmall = false;
  user!: User;

  private small = '(max-width: 1200px)';
  private sub!: Subscription;

  constructor(
    public authService: AuthService,
    private responsive: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.responsive.observe([this.small]).subscribe((result) => {
      const breakpoints = result.breakpoints;
      this.isSmall = breakpoints[this.small];
    });

    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
