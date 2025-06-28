import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsUUID } from 'class-validator';
import { Actions, Models } from 'src/core/types/users.types';

export class UpdatePermission {
    @IsUUID()
    user_id :string

    @IsUUID()
    id : string

    @IsEnum(Actions)
    actions? : Actions[]

    @IsEnum(Models)
    model? : Models
}
