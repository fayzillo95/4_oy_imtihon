import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Movies]), ProfileModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
