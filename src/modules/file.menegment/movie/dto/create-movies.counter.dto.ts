import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from "class-validator";
import { Subscription_type } from "src/core/types/movies.types";

export class CreateMoviesCounterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  @Transform(e => parseInt(e.value))
  @IsNumber()
  release_year: number;

  @Transform(e => parseFloat(e.value))
  @IsNumber()
  duration_minutes: number;
  
  @IsOptional()
  @IsEnum(Subscription_type)
  subscription_type?: Subscription_type;
  
  @Transform(e => JSON.parse(e.value))
  @IsArray()
  @IsString({ each: true }) 
  categories: string[];
}