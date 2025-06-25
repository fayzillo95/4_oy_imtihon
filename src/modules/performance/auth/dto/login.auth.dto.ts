import {PickType} from "@nestjs/mapped-types"
import { CreateUserDto } from "../../users/dto/create-user.dto"
export class LoginAuthDto extends PickType(CreateUserDto,["email", "password"]){}
