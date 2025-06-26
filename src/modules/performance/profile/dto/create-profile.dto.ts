import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    user_id : string

    @IsOptional()
    @IsString()
    full_name? : string

    @IsOptional()
    @IsString()
    phone? : string

    @IsOptional()
    @IsString()
    @IsUUID()
    conutry_id? : string
}
