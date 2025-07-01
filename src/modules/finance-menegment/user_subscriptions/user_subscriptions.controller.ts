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
import { UserSubscriptionsService } from './user_subscriptions.service';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { Models } from 'src/core/types/users.types';
import { Request } from 'express';

@Controller('user-subscriptions')
@SetMetadata('modelname', Models.User_subscriptions)
export class UserSubscriptionsController {
  constructor(
    private readonly userSubscriptionsService: UserSubscriptionsService,
  ) { }

  @Post()
  create(
    @Req() req: Request,
    @Body() data: CreateUserSubscriptionDto) {
    const user_id = req['user'].id  
    return this.userSubscriptionsService.create(data, user_id);
  }

  @Get()
  findAll() {
    return this.userSubscriptionsService.findAll();
  }

  @Get(':id')
  findOne(
    @Req() req: Request,
    @Param('id') id: string) {
    const user_id = req['user'].id  
    return this.userSubscriptionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto,
  ) {
    return this.userSubscriptionsService.update(id, updateUserSubscriptionDto);
  }

  @Delete(':id')
  remove(
    @Req() req: Request,
    @Param('id') id: string) {
    const user_id = req['user'].id  
    return this.userSubscriptionsService.remove(id);
  }
}
