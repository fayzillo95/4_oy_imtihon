import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber } from 'class-validator';
import { Subscription_type } from 'src/core/types/movies.types';

export class CreateSubscriptionPlansDto {
  @ApiProperty({ example: 'premium' })
  @IsEnum(Object.values(Subscription_type))
  name: string;

  @ApiProperty({ example: 15000 })
  @Transform((e) => {
    if (isNaN(+e.value)) {
      throw new BadRequestException('Price is missing number !');
    }
    return e.value;
  })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 30 })
  @Transform((e) => {
    if (isNaN(+e.value)) {
      throw new BadRequestException('duration_days is missing number !');
    }
    return Number(e.value);
  })
  @IsNumber()
  duration_days: number;

  @ApiProperty({ example: [{ reklame: false }, { HD: true }] })
  @Transform((e) => {
    if (Array.isArray(e.value)) return e.value;
    if (typeof e.value === 'string') {
      try {
        return JSON.parse(e.value);
      } catch (error) {
        if (e.value.includes(',')) {
          return e.value.split(',');
        }
      }
    }
    return [e.value];
  })
  @IsArray()
  features: { [key: string]: any }[];

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
