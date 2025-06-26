import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCounterService {
    constructor(
        private jwtService : JwtService,
        private config : ConfigService
    ){}

    async getAccessToken(payload : {id: string, role : string}){
        return this.jwtService.sign(payload)
    }
    async getRefreshToken(payload : {id:  string, role :string}){
        return this.jwtService.sign(
            payload,
            {
                secret : this.config.get<string>("JWT_REFRESH_KEY"),
                expiresIn : this.config.get<string>("JWT_REFRESH_EXPIN")
            }
        )
    }
}
