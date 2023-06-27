/**
 * Dummy auth service for testing.
 */
export class AuthService {
  public loggedIn = false;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 500);
      }
    );
    return promise;
  }

  login(username: string, password: string) {

    if (username === 'foo' && password === 'bar') {
      this.loggedIn = true;
    }
  }

  logout() {
    this.loggedIn = false;
  }
}
