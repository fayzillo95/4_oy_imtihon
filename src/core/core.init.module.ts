import { Module } from '@nestjs/common';
import { DatabaseCounterModule } from './macro-service/databse.counter/databse.counter.module';
import { RedisCounterModule } from './macro-service/redis.counter/redis.counter.module';
import { MailerCounterModule } from './micro-service/mailer.counter/mailer.counter.module';
import { JwtCouterModule } from './micro-service/jwt.counter/jwt.couter.module';

@Module({

  imports: [
    DatabaseCounterModule,
    RedisCounterModule,
    MailerCounterModule,
    JwtCouterModule,
  ],

})
export class CoreInitModule { }
