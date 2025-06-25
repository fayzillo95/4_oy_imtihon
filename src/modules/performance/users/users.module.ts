import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtCounterService } from 'src/core/micro-service/jwt.counter/jwt.counter.service';
import { JwtCouterModule } from 'src/core/micro-service/jwt.counter/jwt.couter.module';
import { JwtService } from '@nestjs/jwt';
import { MailerCounterModule } from 'src/core/micro-service/mailer.counter/mailer.counter.module';

@Module({
  imports : [
    SequelizeModule.forFeature([User]),
    JwtCouterModule,
    MailerCounterModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports : [UsersService]
})
export class UsersModule {}
