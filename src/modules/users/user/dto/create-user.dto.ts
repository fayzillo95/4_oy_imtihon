import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'fayzillo95' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'ovovovlululutvata@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
