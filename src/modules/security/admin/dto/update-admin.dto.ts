import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { Actions, Models } from 'src/core/types/users.types';

export class UpdatePermission {
  @ApiProperty({ example: '6803a715-54f6-4e00-84c9-b27ade9610a2' })
  @IsUUID()
  user_id: string;
  @ApiProperty({ example: '6803a715-54f6-4e00-84c9-b27ade9610a2' })
  @IsUUID()
  id: string;
  @ApiProperty({ example: ['GET', 'PUT'] })
  @IsEnum(Actions)
  actions?: Actions[];

  @ApiProperty({ example: 'Category' })
  @IsEnum(Models)
  model?: Models;
}
