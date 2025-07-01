import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsObject, IsString, IsUUID } from 'class-validator';
import { Actions, Models } from 'src/core/types/users.types';

export class CreatePermissionDto {
  @ApiProperty({ example: '6803a715-54f6-4e00-84c9-b27ade9610a2' })
  @IsUUID()
  user_id: string;
  @ApiProperty({ example: 'Category' })
  @IsEnum(Models)
  model: string;

  @ApiProperty({ example: ['GET', 'POST'] })
  @IsArray()
  @IsEnum(Actions, { each: true })
  actions: Actions[];
}
