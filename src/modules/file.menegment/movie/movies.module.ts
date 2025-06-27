import { Module } from '@nestjs/common';
import { MoviesCounterService } from './movies.service';
import { MoviesCounterController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {  Movies } from './entities/movies.entity';
import { MovieCategory } from './entities/category.entity';
import { MovieFile } from './entities/movie_file.entity';
import { MovieCategories } from './entities/movie.categories';

@Module({
  imports: [SequelizeModule.forFeature([Movies, MovieCategory,MovieFile,MovieCategories])],
  controllers: [MoviesCounterController],
  providers: [MoviesCounterService],
})
export class MoviesCounterModule {}
