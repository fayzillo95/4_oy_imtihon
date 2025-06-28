import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movies.dto';

export class UpdateMoviesDto extends PartialType(CreateMovieDto) {}
