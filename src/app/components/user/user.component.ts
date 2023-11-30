import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private small = '(max-width: 1200px)';
  isSmall = false;

  constructor(
    public authService: AuthService,
    private responsive: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.responsive.observe([this.small]).subscribe((result) => {
      const breakpoints = result.breakpoints;
      this.isSmall = breakpoints[this.small];
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
