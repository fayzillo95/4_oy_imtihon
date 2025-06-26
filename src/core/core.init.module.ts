import { Module } from '@nestjs/common';
import { DatabaseCounterModule } from './macro-service/database/databse.counter.module';
import { RedisCounterModule } from './macro-service/cache/redis.counter.module';
import { MailerCounterModule } from './micro-service/email/mailer.counter.module';
import { JwtCouterModule } from './micro-service/jwt/jwt.couter.module';

@Module({

  imports: [
    DatabaseCounterModule,
    RedisCounterModule,
    MailerCounterModule,
    JwtCouterModule,
  ],

})
export class CoreInitModule { }
