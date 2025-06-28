import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {  Movies } from './entities/movies.entity';
import { MovieCategory } from './entities/category.entity';
import { MovieFile } from './entities/movie_file.entity';
import { MovieCategories } from './entities/movie.categories';

@Module({
  imports: [SequelizeModule.forFeature([Movies, MovieCategory,MovieFile,MovieCategories])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesCounterModule {}
