import { PartialType } from '@nestjs/mapped-types';
import { MovieCategoryCreateDto } from './movie.category.dto';

export class MovieCategoryUpdateDto extends PartialType(MovieCategoryCreateDto){}