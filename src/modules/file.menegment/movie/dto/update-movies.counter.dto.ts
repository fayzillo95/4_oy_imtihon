import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesCounterDto } from './create-movies.counter.dto';

export class UpdateMoviesCounterDto extends PartialType(CreateMoviesCounterDto) {}
