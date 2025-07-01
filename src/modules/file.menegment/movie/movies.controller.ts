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
  Req,
  SetMetadata,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateFileDto, CreateMovieDto } from './dto/create-movies.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import {
  storageFile,
  storagePoster,
  swaggerOptions,
} from './storage/storage.interseptor';
import { Request } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiExtension,
  ApiProperty,
} from '@nestjs/swagger';
import { Models } from 'src/core/types/users.types';
import { rmdirSync } from 'fs';

@Controller('admin')
@ApiCookieAuth('Movie controller ')
@SetMetadata('modelname', Models.Movies)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('getall')
  getAll() {
    return this.moviesService.findAll();
  }

  @Get('/movie-detailes/:id')
  getMovieDetaiels(@Param('id') id: string, @Req() req: Request) {
    const user_id = req['user'].id;
    return this.moviesService.findOneMovieDetailes(id, user_id);
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody(swaggerOptions)
  @Post('add-movie/detailes')
  @UseInterceptors(FileInterceptor('poster', { storage: storagePoster }))
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto, poster);
  }

  @Post('add-movie-file/:id/files')
  @UseInterceptors(FileInterceptor('file', { storage: storageFile }))
  async writeMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateFileDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.moviesService.writeMovie(data, file, id);
      return result;
    } catch (error) {
      rmdirSync(join(process.cwd(), 'uploads', 'files', file.filename));
      throw new error();
    }
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
