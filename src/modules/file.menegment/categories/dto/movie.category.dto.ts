import { IsNotEmpty, IsString } from 'class-validator';

export class MovieCategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
