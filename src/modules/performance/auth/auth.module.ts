import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MailerCounterModule } from 'src/core/micro-service/mailer.counter/mailer.counter.module';
import { JwtCouterModule } from 'src/core/micro-service/jwt.counter/jwt.couter.module';
import { RedisCounterModule } from 'src/core/macro-service/redis.counter/redis.counter.module';

@Module({
  imports : [UsersModule,MailerCounterModule,JwtCouterModule,RedisCounterModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
