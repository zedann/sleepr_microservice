import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // could be a request from express or RPC
        (request: any) => {
          console.log(request);
          return request?.cookies?.Authentication || request?.Authentication;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET', ''),
    });
  }

  async validate({ userId: _id }: TokenPayload) {
    console.log('JWT validate: userId', _id);
    return this.userService.getUser({ _id });
  }
}
