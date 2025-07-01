import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsUUID } from "class-validator";
import { PaymentsMethods } from "src/core/types/users.types";

export class CreatePaymentDto {
    @ApiProperty({ example: "fc24d52f-c040-4950-85d2-d63d7115f4df" })
    @IsUUID()
    user_subscription_id: string

    @ApiProperty({ example: 150000 })
    // @Transform()
    @IsNumber()
    amount: number

    @ApiProperty({ example: PaymentsMethods.CARD })
    @IsEnum(PaymentsMethods)
    payment_method: PaymentsMethods
    @ApiProperty({
        description: 'Toʻlov tafsilotlari roʻyxati. Har bir obyekt bitta toʻlovni bildiradi.',
        example: [
            {
                card_type: 'VISA',
                card_number: '**** **** **** 1234',
                amount: 150000,
                currency: 'UZS',
                transaction_id: 'TXN123456',
                paid_at: '2025-07-01T14:30:00Z',
            },
            {
                card_type: 'HUMO',
                card_number: '**** **** **** 5678',
                amount: 200000,
                currency: 'UZS',
                transaction_id: 'TXN789012',
                paid_at: '2025-07-01T15:00:00Z',
            }
        ]
    })
    @Transform((e) => {
        try {
            if(e.value.include(",")) return e.value.split(",")
            if (typeof e.value === 'string') return JSON.parse(e.value);
            if (Array.isArray(e.value)) return e.value;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    })
    @IsArray()
    payment_details: { [key: string]: any }[];


}
