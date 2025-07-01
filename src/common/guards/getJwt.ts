import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtConnectionService } from '../../core/micro-service/jwt/jwt.connection.service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class GetJwt implements CanActivate {
  constructor(
    private readonly jwtService: JwtConnectionService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.isPublic(request, context);
    // console.log("GetJwtGuard canActive Ispublic  function returns -> ",token)
    if (!token) return true;
    try {
      const payload = await this.jwtService.verifyAccessToken(token);
      console.log('GwtJwtcanActive return payload -> ', payload);
      request['user'] = payload;
      return true;
    } catch (err) {
      console.error('TOKEN ERROR:', err);
      throw new UnauthorizedException('Invalid or expired token!');
    }
  }
  async isPublic(req: Request, ctx: ExecutionContext) {
    const publicList = this.reflector.getAllAndOverride('isPublic', [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
    // console.log("isPublic function getAllAndOverrirde reflector function returns -> ",publicList)
    if (publicList) {
      return false;
    } else {
      const token = req.cookies. accessToken;
      if (!token) throw new UnauthorizedException('Token not found !');
      return token;
    }
  }
}
