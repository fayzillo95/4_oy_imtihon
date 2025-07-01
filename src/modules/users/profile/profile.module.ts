import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './entities/profile.entity';
import { JwtConnectionModule } from 'src/core/micro-service/jwt/jwt.connection.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Profile,User])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
