import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtConnectionService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) { }

  async getAccessToken(payload: { id: string; role: string }) {
    return this.jwtService.sign(payload);
  }
  async getRefreshToken(payload: { id: string; role: string }) {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_KEY'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIN'),
    });
  }
  async getSessionToke(payload: {
        email: string,
        code: string,
      },
  ) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>("JWT_SESSION_KEY"),
      expiresIn : "610s"
    })
  }
  async verfiySessionTken(token : string){
    return this.jwtService.verifyAsync(token, {
      secret: this.config.getOrThrow<string>("JWT_SESSION_KEY"),
    })
  }
}
