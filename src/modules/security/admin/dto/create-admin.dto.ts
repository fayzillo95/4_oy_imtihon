import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Validate } from 'class-validator';
import { IsUUID } from 'class-validator';
import { UserRole } from 'src/core/types/users.types';

export class RoleDto {
  @ApiProperty({ example: '6803a715-54f6-4e00-84c9-b27ade9610a2' })
  @IsUUID('4')
  user_id: string;
  @ApiProperty({ example: 'admin' })
  @IsEnum(UserRole)
  role: UserRole;
}
