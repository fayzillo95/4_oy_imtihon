import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../users/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@SetMetadata('isPublic', true)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.authService.sendVerifyUrl(data);
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string, @Res() res: Response) {
    const result = await this.authService.verificationUserAndRegister(token);
    res.cookie('accessToken', result.accessToken, {
      maxAge: 24 * (60 * 1000 * 60),
      httpOnly: true,
    });
    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 168 * (60 * 1000 * 60),
      httpOnly: true,
    });

    const baseUrl = process.env.BASE_URL || this.config.get<string>("BASE_URL")
    
    res.redirect(`${baseUrl}/api/profile/may-accaunt`);
    return result.accessToken;
  }
  @Post('login')
  async login(@Body() data: LoginAuthDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.loginAndGetToken(data);
    res.cookie('accessToken', accessToken, {
      maxAge: 24 * (60 * 1000 * 60),
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 168 * (60 * 1000 * 60),
      httpOnly: true,
    });

    const baseUrl = process.env.BASE_URL || this.config.get<string>("BASE_URL")
    res.redirect(`${baseUrl}/api/profile/may-account`);
    return accessToken;
  }
}
