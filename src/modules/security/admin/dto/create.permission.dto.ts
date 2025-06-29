import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsObject, IsString, IsUUID } from 'class-validator';
import { Actions, Models } from 'src/core/types/users.types';

export class CreatePermissionDto {
  @IsUUID()
  user_id: string;

  @IsEnum(Models)
  model: string;

  @IsArray()
  @IsEnum(Actions, { each: true })
  actions: Actions;
}
