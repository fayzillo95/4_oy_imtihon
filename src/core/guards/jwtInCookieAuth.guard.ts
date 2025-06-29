import {
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtConnectionService } from '../micro-service/jwt/jwt.connection.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtConnectionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.accessToken;
    console.log(request.cookies);
    if (!token) {
      throw new UnauthorizedException('Access token topilmadi');
    }

    try {
      const payload = await this.jwtService.verifyAccessToken(token);
      console.log(payload);
      request['user'] = payload;
      return true;
    } catch (err) {
      console.error('TOKEN ERROR:', err);
      throw new UnauthorizedException('Token yaroqsiz yoki eskirgan');
    }
  }
}
