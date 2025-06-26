import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtCounterService } from 'src/core/micro-service/jwt/jwt.counter.service';
import { MailerCounterService } from 'src/core/micro-service/email/mailer.counter.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { RedisCounterService } from 'src/core/macro-service/cache/redis.counter.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtCounterService,
        private readonly mailerService: MailerCounterService,
        private readonly userService: UsersService,
        private readonly redisService : RedisCounterService
    ) { }
    async otpRegister(userdto: CreateUserDto) {
        const emailstatus = await this.mailerService.sendRegisterVerify(userdto.email)
        const user = await this.userService.create(userdto)
        if (user.id && user.role) {
            const token = await this.jwtService.getAccessToken({
                id: user.id,
                role: user.role
            })
            const redisSts = await this.redisService.setItem("user",user)
            const oldredis = await this.redisService.getCounter("user")
            console.log( {
                user,token,response : emailstatus.response,redisSts
            })
            return {
                user,token,response : emailstatus.response,redisSts,oldredis
            }
        } else {
            return {
                emailstatus,
                user, userdto
            }
        }

    }
    async loginAndGetToken(data: LoginAuthDto) {
        const exists = await this.userService.findByEmail(data.email)
        if (exists && exists.id && exists.role) {
            return {
                accessToken: await this.jwtService.getAccessToken({
                    id: exists.id, role: exists.role
                }),
                refreshToken : await this.jwtService.getRefreshToken({
                    id : exists.id, role : exists.role
                }), exists
            }
        }else{
            throw new NotFoundException("Invalid email or password !")
        }
    }
}
