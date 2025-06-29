import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './entities/profile.entity';
import { JwtConnectionModule } from 'src/core/micro-service/jwt/jwt.connection.module';

@Module({
  imports: [SequelizeModule.forFeature([Profile]), JwtConnectionModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
