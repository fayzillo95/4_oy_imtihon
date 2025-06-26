import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config : ConfigService
  ) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.authService.sendVerifyUrl(data);
  }
  @Get("verify/:token")
  async verify(
    @Param("token") token : string,
    @Res() res : Response
  ){
    const result = await this.authService.verificationUserAndRegister(token)
    res.cookie("accessToken",  result.accessToken)
    res.cookie("refreshToken", result.refreshToken)
    const host = this.config.get<string>("APP_HOST")
    const port = this.config.get<string>("APP_PORT")
    res.redirect(`http://${host}:${port}/api/profile/may-accaunt`)
    return 
  }
  @Post('login')
  login(@Body() data: LoginAuthDto) {
    return this.authService.loginAndGetToken(data);
  }
}
