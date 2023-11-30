export class User {
  name: string;
  password: string;
  avatar: string;

  constructor(name: string, password: string, avatar: string) {
    this.name = name;
    this.password = password;
    this.avatar = avatar;
  }
}
