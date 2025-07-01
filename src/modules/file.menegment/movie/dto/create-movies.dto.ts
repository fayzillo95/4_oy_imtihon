import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { QualityType, Subscription_type } from 'src/core/types/movies.types';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform((e) => parseInt(e.value))
  @IsNumber()
  release_year: number;

  @Transform((e) => parseFloat(e.value))
  @IsNumber()
  duration_minutes: number;

  @IsOptional()
  @IsEnum(Subscription_type)
  subscription_type?: Subscription_type;

  @Transform((e) => {
    console.log(e.value.split(','));
    // if (Array.isArray(e.value)) e.value
    // JSON.parse(e.value)
    return e.value.split(',');
  })
  @IsArray()
  @IsString({ each: true })
  category_ids: string[];
}

export class CreateFileDto {
  @IsString()
  @IsEnum(QualityType)
  quality: string;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  language: string;
}
