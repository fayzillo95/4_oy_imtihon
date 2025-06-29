import { IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  movie_id: string;
}
