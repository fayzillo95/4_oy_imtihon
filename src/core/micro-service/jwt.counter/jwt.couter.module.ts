import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtCounterService } from './jwt.counter.service';

@Module({
    imports : [
        JwtModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (config : ConfigService) => ({
                secret : config.getOrThrow<string>("JWT_ACCESS_KEY"),
                signOptions : {
                    expiresIn : config.getOrThrow<string>("JWT_ACCESS_EXPIN")
                }
            })
        })
    ],
    providers : [JwtCounterService],
    exports : [JwtCounterService]
})
export class JwtCouterModule {}
