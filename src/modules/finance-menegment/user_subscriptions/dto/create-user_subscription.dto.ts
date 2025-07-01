import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";

export class CreateUserSubscriptionDto {
    @ApiProperty({example : "f165d80c-ed00-49d1-b633-095e80582262"})
    @IsUUID()
    plan_id : string
    
    @ApiProperty({example : false})
    @IsBoolean()
    auto_renew : boolean

}

