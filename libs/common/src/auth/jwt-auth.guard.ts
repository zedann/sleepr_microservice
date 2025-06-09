import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto/user.dto';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) return false;
    return this.authClient
      .send<UserDto>('authenticate', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Authentication: jwt,
      })
      .pipe(
        tap((resp) => {
          context.switchToHttp().getRequest().user = resp;
          console.log('response from auth service:', resp);
        }),
        map(() => true),
      );
  }
}
