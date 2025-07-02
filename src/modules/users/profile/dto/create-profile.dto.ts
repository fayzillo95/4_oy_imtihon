import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'a3f1c2b4-5d6e-7f8a-9b0c-1d2e3f4a5b6c' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e' })
  @IsOptional()
  @IsString()
  @IsUUID()
  country_id?: string;
}
