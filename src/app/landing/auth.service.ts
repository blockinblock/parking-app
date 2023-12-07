import { Injectable } from '@angular/core';

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

  isAuthenticated(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const status = localStorage.getItem('token');
        status === 'true' ? (this.loggedIn = true) : (this.loggedIn = false);
        resolve(this.loggedIn);
      }, 500);
    });
    return promise;
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
