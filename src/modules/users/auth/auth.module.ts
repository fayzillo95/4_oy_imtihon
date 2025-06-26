import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailerConnectionModule } from 'src/core/micro-service/email/mailer.connection.module';
import { JwtConnectionModule } from 'src/core/micro-service/jwt/jwt.connection.module';
import { RedisConnectionModule } from 'src/core/micro-service/cache/redis.connection.module';

@Module({
  imports: [
    UserModule,
    MailerConnectionModule,
    JwtConnectionModule,
    RedisConnectionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
