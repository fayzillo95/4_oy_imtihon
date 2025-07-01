import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  SetMetadata,
} from '@nestjs/common';
import { MovieCategoryCreateDto } from './dto/movie.category.dto';
import { CategoryService } from './category.service.service';
import { MovieCategoryUpdateDto } from './dto/movie.category.update.dto';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Models } from 'src/core/types/users.types';

@Controller('category')
@ApiCookieAuth('Categoriy ')
@SetMetadata('modelname', Models.Categoris)
export class CategoriyController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  createCategory(@Body() data: MovieCategoryCreateDto) {
    return this.categoryService.createCategory(data);
  }
  @Get('getall')
  findAll() {
    return this.categoryService.findAllCategoriy();
  }
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: MovieCategoryUpdateDto) {
    return this.categoryService.updateCategoriy(id, data);
  }
}
