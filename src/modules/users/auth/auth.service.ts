import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtConnectionService } from 'src/core/micro-service/jwt/jwt.connection.service';
import { MailerConnectionService } from 'src/core/micro-service/email/mailer.connection.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { RedisConnectService } from 'src/core/micro-service/cache/redis.connection.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtConnectionService,
    private readonly mailerService: MailerConnectionService,
    private readonly userService: UserService,
    private readonly redisService: RedisConnectService,
  ) {}
  async otpRegister(userdto: CreateUserDto) {
    const emailstatus = await this.mailerService.sendRegisterVerify(
      userdto.email,
    );
    const user = await this.userService.create(userdto);
    if (user.id && user.role) {
      const token = await this.jwtService.getAccessToken({
        id: user.id,
        role: user.role,
      });
      const redisSts = await this.redisService.setItem('user', user);
      const oldredis = await this.redisService.getCounter('user');
      console.log({
        user,
        token,
        response: emailstatus.response,
        redisSts,
      });
      return {
        user,
        token,
        response: emailstatus.response,
        redisSts,
        oldredis,
      };
    } else {
      return {
        emailstatus,
        user,
        userdto,
      };
    }
  }
  async loginAndGetToken(data: LoginAuthDto) {
    const exists = await this.userService.findByEmail(data.email);
    if (exists && exists.id && exists.role) {
      return {
        accessToken: await this.jwtService.getAccessToken({
          id: exists.id,
          role: exists.role,
        }),
        refreshToken: await this.jwtService.getRefreshToken({
          id: exists.id,
          role: exists.role,
        }),
        exists,
      };
    } else {
      throw new NotFoundException('Invalid email or password !');
    }
  }
}
