import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Subscription_type } from 'src/core/types/movies.types';

export class UpdateSubscriptionPlansDto {
  @ApiProperty({ example: 'premium' })
  @IsOptional()
  @IsEnum(Object.values(Subscription_type))
  name?: string;

  @ApiProperty({ example: 15000 })
  @IsOptional()
  @Transform((e) => {
    if (isNaN(+e.value)) {
      throw new BadRequestException('Price is missing number !');
    }
    return Number(e.value);
  })
  price?: number;

  @ApiProperty({ example: 30 })
  @IsOptional()
  @Transform((e) => {
    if (isNaN(+e.value)) {
      throw new BadRequestException('duration_days is missing number !');
    }
    return Number(e.value);
  })
  @IsNumber()
  duration_days?: number;

  @ApiProperty({ example: [{ reklame: false }, { HD: true }] })
  @IsOptional()
  @Transform((e) => {
    if (Array.isArray(e.value)) return e.value;
    if (typeof e.value === 'string') {
      try {
        JSON.parse(e.value);
      } catch (error) {
        if (e.value.includes(',')) {
          return e.value.split(',');
        }
      }
    }
    return [e.value];
  })
  @IsArray()
  features?: object[];

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
