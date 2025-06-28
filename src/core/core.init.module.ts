import { Module } from '@nestjs/common';
import { DatabaseConnectModule } from './micro-service/database/databse.connect.module';
import { RedisConnectionModule } from './micro-service/cache/redis.connection.module';
import { MailerConnectionModule } from './micro-service/email/mailer.connection.module';
import { JwtConnectionModule } from './micro-service/jwt/jwt.connection.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads", "posters"),
      serveRoot: "/posters"
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads", "fies"),
      serveRoot: "/files"
    }),
    DatabaseConnectModule,
    RedisConnectionModule,
    MailerConnectionModule,
    JwtConnectionModule,
  ],
})
export class CoreInitModule { }
