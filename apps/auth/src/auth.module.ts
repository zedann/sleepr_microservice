import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
// import { DatabaseModule, LoggerModule } from '@app/common';
// import { UserDocument, UserSchema } from './users/models/user.schema';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
