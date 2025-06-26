import { Module } from '@nestjs/common';
import { MoviesCounterService } from './movies.service';
import { MoviesCounterController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieCategory, MovieFile, Movies } from './entities/movies.entity';

@Module({
  imports: [SequelizeModule.forFeature([Movies, MovieCategory,MovieFile])],
  controllers: [MoviesCounterController],
  providers: [MoviesCounterService],
})
export class MoviesCounterModule {}
