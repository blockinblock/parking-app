/**
 * Dummy auth service for testing.
 */
export class AuthService {
  public loggedIn = false;

  public isAuthenticated(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const status = localStorage.getItem('token');
        status === 'true' ? this.loggedIn = true : this.loggedIn = false;
        resolve(this.loggedIn);
      }, 500);
    });
    return promise;
  }

  public login(username: string, password: string): void {
    if (username === "foo" && password === "bar") {
      this.loggedIn = true;
    }
    localStorage.setItem('token', this.loggedIn.toString());
  }

  public logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }
}
