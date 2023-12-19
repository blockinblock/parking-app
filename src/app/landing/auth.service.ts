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
  private _avatar = 'https://i.pravatar.cc/100?img=11';
  private _loggedIn = false;
  private _password = '123';
  private _tokenName = 'parking.token';
  private _user = new User('', this._password, this._avatar);

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(val: boolean) {
    this._loggedIn = val;
  }

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  isAuthenticated(): Observable<any> {
    const tokenStr = localStorage.getItem(this._tokenName) || '';
    let token;

    tokenStr.length > 0 ? token = JSON.parse(tokenStr) : token = null;

    this.user.avatar = token?.avatar || '';
    this.user.name = token?.username || '';
    this.loggedIn = token?.loggedIn || false;

    return of(this.loggedIn);
  }

  login(username: string, password: string) {
    this.loggedIn = password === this._password;
    this.user.name = username;
    this.user.avatar = this._avatar;

    const token = {
      username: this.user.name,
      loggedIn: this.loggedIn,
      avatar: this._avatar,
    };

    localStorage.setItem(this._tokenName, JSON.stringify(token));
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem(this._tokenName);
  }
}
