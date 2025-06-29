import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() data: CreateFavoriteDto) {
    return this.favoritesService.create(data);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Patch('update-one/:id')
  update(@Param('id') id: string, @Body() data: Partial<CreateFavoriteDto>) {
    return this.favoritesService.update(id, data);
  }

  @Get('get-one/by-user-id/:id')
  getByUserId(@Param('id') id: string) {
    return this.favoritesService.findByUserId(id);
  }

  @Get('get-one/by-movie-id/:id')
  getByMovieId(@Param('id') id: string) {
    return this.favoritesService.findByUserId(id);
  }

  @Delete('delete-one/:id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
