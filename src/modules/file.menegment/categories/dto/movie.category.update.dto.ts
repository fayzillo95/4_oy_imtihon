import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MovieCategoryUpdateDto {
  @ApiProperty({ example: 'dramma' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Drammaturgiya !' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
