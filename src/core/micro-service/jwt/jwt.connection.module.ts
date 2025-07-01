import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtConnectionService } from './jwt.connection.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_ACCESS_KEY'),
        signOptions: {
          expiresIn: config.getOrThrow<string>('JWT_ACCESS_EXPIN'),
        },
      }),
    }),
  ],
  providers: [JwtConnectionService],
  exports: [JwtConnectionService],
})
export class JwtConnectionModule {}
