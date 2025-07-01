import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  Req,
} from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { UpdateUserReviewDto } from './dto/update-user-review.dto';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Models } from 'src/core/types/users.types';
import { Request } from 'express';

@Controller('user-reviews')
@ApiCookieAuth('User reviews !')
@SetMetadata('modelname', Models.Reviews)
export class UserReviewsController {
  constructor(private readonly userReviewsService: UserReviewsService) {}

  @Post("create-one")
  create(
    @Body() createUserReviewDto: CreateUserReviewDto,
    @Req() req: Request,
  ) {
    const id = req['user'].id;
    return this.userReviewsService.create(createUserReviewDto, id);
  }

  @Get("get-all")
  findAll() {
    return this.userReviewsService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.userReviewsService.findOne(id);
  }

  @Patch('update-one/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserReviewDto: UpdateUserReviewDto,
  ) {
    return this.userReviewsService.update(id, updateUserReviewDto);
  }

  @Delete('destroy-one/:id')
  remove(@Param('id') id: string) {
    return this.userReviewsService.remove(id);
  }
}
