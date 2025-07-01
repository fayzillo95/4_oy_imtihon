import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEnum,  IsNumber,  IsUUID } from "class-validator";
import { PaymentsMethods } from "src/core/types/users.types";

export class CreatePaymentDto {
    @ApiProperty({ example: "" })
    @IsUUID()
    user_subscription_id: string

    @ApiProperty({ example: "" })
    // @Transform()
    @IsNumber()
    amount : number

    @ApiProperty({ example: "" })
    @IsEnum(PaymentsMethods)
    payment_method: PaymentsMethods

    @IsArray()
    payment_details: { [key: string]: any }[]

}
