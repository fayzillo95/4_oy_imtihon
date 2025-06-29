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
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateFileDto, CreateMovieDto } from './dto/create-movies.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { storageFile, storagePoster } from './storage/storage.interseptor';
import { JwtAuthGuard } from 'src/core/guards/jwtInCookieAuth.guard';
import { Request } from 'express';

@Controller('admin')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('getall')
  getAll() {
    return this.moviesService.findAll();
  }

  @Get('/movie-detailes/:id')
  @UseGuards(JwtAuthGuard)
  getMovieDetaiels(@Param('id') id: string, @Req() req: Request) {
    const user_id = req['user'].id;
    return this.moviesService.findOneMovieDetailes(id, user_id);
  }

  @Post('add-movie/detailes')
  @UseInterceptors(FileInterceptor('poster', { storage: storagePoster }))
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto, poster);
  }

  @Post('movies/:id/files')
  @UseInterceptors(FileInterceptor('file', { storage: storageFile }))
  writeMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateFileDto,
    @Param('id') id: string,
  ) {
    return this.moviesService.writeMovie(data, file, id);
  }

  @Put('movies/:id/files')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename(req, file, callback) {
          const newName = uuidv4() + extname(file.originalname);
          callback(null, newName);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  updateMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateMoviesDto,
    @Param('id') id: string,
  ) {
    return this.moviesService.update(id, data, file || null);
  }

  @Delete('remove/:id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  @Get('m-ct/getall')
  getMCt() {
    return this.moviesService.getAllMCt();
  }
}
