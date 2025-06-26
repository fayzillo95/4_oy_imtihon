import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MoviesCounterService } from './movies.service';
import { CreateFileDto, CreateMovieDto } from './dto/create-movies.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('admin')
export class MoviesCounterController {
  constructor(private readonly moviesCounterService: MoviesCounterService) {}

  @Post('add-movie')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, cb) => {
          const fileName = uuidv4() + extname(file.originalname);
          cb(null, fileName);
        },
      }),
    }),
  )
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() poster : Express.Multer.File
  ) {
    console.log(poster);
    return this.moviesCounterService.create(createMovieDto,poster);
  }

  @Post("movies/:id/files")
  @UseInterceptors(FileInterceptor("file", {
    storage : diskStorage({
      destination : "./uploads/files",
      filename(req, file, callback) {
        const newName = uuidv4() + extname(file.originalname)
        callback(null,newName)
      },
    }),
    fileFilter(req, file, callback) {
      callback(null,true)
    },
  }))
  writeMovie(
    @UploadedFile() file : Express.Multer.File,
    @Body() data : CreateFileDto,
    @Param("id") id : string
  ){
    return this.moviesCounterService.writeMovie(data,file,id)
  }
  @Get("getall")
  getAll(){
    return this.moviesCounterService.findAll()
  }
}
