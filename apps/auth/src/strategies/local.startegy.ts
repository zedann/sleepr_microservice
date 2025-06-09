import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('here1->');
    try {
      const user = await this.userService.verifyUser(email, password);
      console.log('here2->', user);
      return user;
    } catch (error) {
      console.log('here->error:', error);
      throw new UnauthorizedException(error);
    }
  }
}
