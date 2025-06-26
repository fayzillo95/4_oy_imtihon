import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtCounterService } from 'src/core/micro-service/jwt/jwt.counter.service';
import { JwtCouterModule } from 'src/core/micro-service/jwt/jwt.couter.module';
import { JwtService } from '@nestjs/jwt';
import { MailerCounterModule } from 'src/core/micro-service/email/mailer.counter.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports : [
    SequelizeModule.forFeature([User]),
    JwtCouterModule,
    MailerCounterModule,
    ProfileModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports : [UsersService]
})
export class UsersModule {}
