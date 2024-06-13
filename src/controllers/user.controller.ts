import { Request } from 'alado';
import { DataHolder } from '@data';
import { SignUpDto, UserDto } from '@dto';

export class UserController {

  public async create(req: Request) {
    const { body } = req;
    const { username } = body;
    const isFree = DataHolder.isUsernameFree(username);
    if (!isFree) {
      return {
        statusCode: 409,
        headers: { 'Content-Type': 'application/json' },
        body: {
          message: `Username ${username} is taken already`
        }
      }
    }
    const user = DataHolder.signUp(body as SignUpDto);
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: user
    }
  }

  public async getById(req: Request) {
    const { path } = req;
    const user = DataHolder.getUser(path.id);
    return {
      statusCode: user ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
      body: user|| { message: 'Not Found' }
    }
  }

  public async getList(req: Request) {
    const users = DataHolder.getUsers();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: users
    }
  }

  public async update(req: Request) {
    const { path, body } = req;
    const user = DataHolder.getUser(path.id);
    if (user) {
      DataHolder.setUser(path.id, body as UserDto)
    }
    return {
      statusCode: user ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
      body: DataHolder.getUser(path.id) || { message: 'Not Found' }
    }
  }

}

export const userController = new UserController();
