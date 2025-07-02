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
      rootPath: join(process.cwd(), "src", "common", "utils", "uploads", "posters"),
      serveRoot: '/posters',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "uploads", "files"),
      serveRoot: '/files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public"),
      serveRoot: '/api/public',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "home"),
      serveRoot: '/api/public/home',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "profile"),
      serveRoot: '/api/public/profile',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "auth", "login.html"),
      serveRoot: '/api/public/auth',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "home", "index.html"),
      serveRoot: '/api/public/home/index.html',
      serveStaticOptions: {
        index: false, // disables default index.html serving      
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "auth", "login.html"),
      serveRoot: '/api/public/auth/login.html',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "auth", "register.html"),
      serveRoot: '/api/public/auth/register.html',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "home", "style.css"),
      serveRoot: '/api/public/home/style.css',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "profile", "style.css"),
      serveRoot: '/api/public/profile/style.css',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "auth", "style.css"),
      serveRoot: '/api/public/auth/style.css',
      serveStaticOptions: {
        index: false, // disables default index.html serving    
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "swagger", "style.css"),
      serveRoot: '/api/public/swagger/style.css',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "index.html"),
      serveRoot: '/api/public/index.html',
      serveStaticOptions: {
        index: false, // disables default index.html serving  
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "home", "main.js"),
      serveRoot: '/api/public/home/main.js',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "profile", "main.js"),
      serveRoot: '/api/public/profile/main.js',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "src", "common", "utils", "public", "auth", "main.js"),
      serveRoot: '/api/public/auth/main.js',
      serveStaticOptions: {
        index: false, // disables default index.html serving
      },
    }),

    DatabaseConnectModule,
    RedisConnectionModule,
    MailerConnectionModule,
    JwtConnectionModule,
  ],
})
export class CoreInitModule { }
