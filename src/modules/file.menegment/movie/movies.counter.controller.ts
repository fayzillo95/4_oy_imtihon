import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MoviesCounterService } from './movies.counter.service';
import { CreateMoviesCounterDto } from './dto/create-movies.counter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MovieCategoryCreateDto } from './dto/movie.category.dto';
import { CategoryCounterService } from '../categories/category.service.service';
// import { UpdateMoviesCounterDto } from './dto/update-movies.counter.dto';

@Controller('movies.counter')
export class MoviesCounterController {
  constructor(
    private readonly moviesCounterService: MoviesCounterService,
    private readonly categoryService : CategoryCounterService
  ) {}

  @Post("add-movie")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = uuidv4() + extname(file.originalname);
          cb(null, fileName);
        },
      }),
    }),
  )

  createMovie(
    @Body() createMoviesCounterDto: CreateMoviesCounterDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file)
    return createMoviesCounterDto
  }

  @Post("create-category")
  createCategory(data : MovieCategoryCreateDto){
    return this.categoryService.createCategory(data)
  }
}
