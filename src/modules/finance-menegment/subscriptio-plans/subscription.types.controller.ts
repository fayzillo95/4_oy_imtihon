import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription.types.service';
import { CreateSubscriptionPlansDto } from './dto/subscription.types.create.dto';
import { UpdateSubscriptionPlansDto } from './dto/subscription.types.update.dto';

@Controller('finance-menegment')
export class SubscriptionPlansController {
  constructor(private readonly subscriptionPlansService: SubscriptionPlansService) {}

  @Post()
  create(@Body() data: CreateSubscriptionPlansDto) {
    return this.subscriptionPlansService.create(data);
  }

  @Get()
  findAll() {
    return this.subscriptionPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionPlansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSubscriptionPlansDto) {
    return this.subscriptionPlansService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
