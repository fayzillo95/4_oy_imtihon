import { Module } from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { UserReviewsController } from './user-reviews.controller';

@Module({
  controllers: [UserReviewsController],
  providers: [UserReviewsService],
})
export class UserReviewsModule {}
