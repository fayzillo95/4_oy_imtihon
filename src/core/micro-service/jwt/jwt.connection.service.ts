import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/core/types/jwt.types';

@Injectable()
export class JwtConnectionService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async getAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_KEY'),
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIN'),
    });
  }

  async getRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_KEY'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIN'),
    });
  }

  async getSessionToke(payload: { email: string; code: string }) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_SESSION_KEY'),
      expiresIn: '610s',
    });
  }

  async verfiySessionTken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.getOrThrow<string>('JWT_SESSION_KEY'),
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    console.log(token);
    const result = await this.jwtService.verifyAsync(token, {
      secret: this.config.get<string>('JWT_ACCESS_KEY'),
    });
    return { id: result.id, role: result.role };
  }
}
