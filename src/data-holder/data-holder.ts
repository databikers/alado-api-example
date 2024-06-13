import { v4 } from 'uuid';

import {
  AuthSourceDto,
  SignInDto,
  SignUpDto,
  UserDto
} from '@dto';

const users = new Map<string, UserDto>();
const authSources = new Map<string, AuthSourceDto>();

export class DataHolder {

  static signUp(data: SignUpDto) {
    const { password, ...user } = data;
    const { username } = user;
    const id = new Date().getTime().toString(16);
    const token = v4();
    users.set(id, user);
    authSources.set(token, { password, username, user: id });
    const u = users.get(id);
    return { id, ...u }
  }

  static signIn(data: SignInDto): string {
    const { username, password} = data;
    let bearer: string;
    authSources.forEach((authSource: AuthSourceDto, token: string) => {
      if (!bearer) {
        if (authSource.username === username && authSource.password === password) {
          bearer = token;
        }
      }
    });
    return bearer;
  }

  static bearerAuth(token: string){
    const authSource = authSources.get(token);
    if (!authSource) {
      return
    }
    const { user } = authSource;
    return users.get(user);
  }

  static getUser(id: string) {
    return { id, ...users.get(id) };
  }

  static isUsernameFree(username: string) {
    return !Array.from(users.values()).some((user: UserDto) => user.username === username)
  }

  static setUser(id: string, user: UserDto) {
    users.set(id, user);
    return users.get(id);
  }

  static getUsers() {
    const data: UserDto[] = [];
    users.forEach((user: UserDto, id: string) => {
      data.push({ id, ...user });
    })
    return data;
  }

}
