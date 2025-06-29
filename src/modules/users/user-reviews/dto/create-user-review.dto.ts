import { IsNumber, IsString } from "class-validator";
import { CreateFavoriteDto } from "../../user-favorite/dto/create-favorite.dto";
import { Transform } from "class-transformer";

export class CreateUserReviewDto extends CreateFavoriteDto{
    @Transform((e) => typeof e.value !== "number" ? 
                    isNaN(+e.value) ? false : 
                    Number(e.value) : e.value
                )
    @IsNumber()
    rating : number

    @IsString()
    comment : string
}
