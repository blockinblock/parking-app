import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../parking/models/user.model';

/**
 * Dummy auth service for testing.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;

  user = new User('Bob', '123', 'https://i.pravatar.cc/100?img=11');

  isAuthenticated(): Observable<any> {
    const status = localStorage.getItem('token');
    status === 'true' ? (this.loggedIn = true) : (this.loggedIn = false);
    return of(this.loggedIn);
  }

  login(username: string, password: string) {
    if (password === this.user.password) {
      this.user.name = username;
      this.loggedIn = true;
    }
    localStorage.setItem('token', this.loggedIn.toString());
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }
}
