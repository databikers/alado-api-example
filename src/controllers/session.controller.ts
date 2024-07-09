import { Request } from 'alado';
import { DataHolder } from '@data';
import { SignInDto } from '@dto';

export class SessionController {
  public async signIn(req: Request) {
    const { body } = req;
    const token = DataHolder.signIn(body as SignInDto);
    const user = DataHolder.bearerAuth(token);
    return {
      statusCode: token ? 200 : 401,
      headers: { 'Content-Type': 'application/json' },
      body: { token, user } || { message: 'Unauthorized' },
    };
  }
}

export const sessionController = new SessionController();
