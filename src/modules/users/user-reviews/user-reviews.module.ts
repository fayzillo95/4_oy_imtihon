import { Module } from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { UserReviewsController } from './user-reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Reviews } from './entities/user-review.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Reviews, Movies])],
  controllers: [UserReviewsController],
  providers: [UserReviewsService],
})
export class UserReviewsModule {}
