import { IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateFavoriteDto } from '../../user-favorite/dto/create-favorite.dto';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReviewDto {
  @ApiProperty({ example: 4.5 })
  @Transform((e) =>
    typeof e.value !== 'number'
      ? isNaN(+e.value)
        ? false
        : Number(e.value)
      : e.value,
  )
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'Your comment ...' })
  @IsString()
  comment: string;

  @ApiProperty({ example: '5a763737-0319-4fa3-aea6-1c6156945ea0' })
  @IsUUID()
  movie_id: string;
}
