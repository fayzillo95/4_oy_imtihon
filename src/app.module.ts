import { Module } from '@nestjs/common';
import { CoreInitModule } from './core/core.init.module';
import { UsersModule } from './modules/performance/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/performance/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : [".env"]
    }),
    CoreInitModule, 
    UsersModule, AuthModule
  ],
})
export class AppModule {}
