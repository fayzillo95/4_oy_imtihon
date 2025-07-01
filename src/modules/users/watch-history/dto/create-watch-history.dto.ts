import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsUUID } from "class-validator";

export class CreateWatchHistoryDto {
    @ApiProperty({example : "ewcewce-cewce-cewced-cewecw"})
    @IsUUID()
    movie_id : string

    @ApiProperty({example : 15})
    @Transform((e) => {
        if(isNaN(+e.value)){
            throw new BadRequestException(`Invalid value watched_duration : [ ${e.value} ]  is missing Integer !`)
        }
        return parseInt(e.value)
    })
    @IsNumber()
    watched_duration : number

    @ApiProperty({example : 25.5})
    @IsNumber()
    watched_percentage : number
}
