import { IsEnum, IsString, Validate } from "class-validator";
import { IsUUID } from "class-validator";
import { UserRole } from "src/core/types/users.types";

export class RoleDto {
    @IsUUID('4')
    user_id : string

    @IsEnum(UserRole)
    role : UserRole
}
