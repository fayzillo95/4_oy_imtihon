import { Module } from '@nestjs/common';
import { MoviesCounterService } from './movies.counter.service';
import { MoviesCounterController } from './movies.counter.controller';
import { CategoryCounterService } from '../categories/category.service.service';
// import { CategoryCounterService } from './category.counter.service.service';

@Module({
  controllers: [MoviesCounterController],
  providers: [MoviesCounterService,CategoryCounterService],
})
export class MoviesCounterModule {}
