import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
        if (authenticated) {
          subscriber.next(true);
        } else {
          this.router.navigate(['/']);
          subscriber.next(false);
        }
        subscriber.complete();
      });
    });
  }
}
