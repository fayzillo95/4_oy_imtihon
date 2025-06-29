import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserReviewsService } from './user-reviews.service';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { UpdateUserReviewDto } from './dto/update-user-review.dto';

@Controller('user-reviews')
export class UserReviewsController {
  constructor(private readonly userReviewsService: UserReviewsService) {}

  @Post()
  create(@Body() createUserReviewDto: CreateUserReviewDto) {
    return this.userReviewsService.create(createUserReviewDto);
  }

  @Get()
  findAll() {
    return this.userReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserReviewDto: UpdateUserReviewDto,
  ) {
    return this.userReviewsService.update(+id, updateUserReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userReviewsService.remove(+id);
  }
}
