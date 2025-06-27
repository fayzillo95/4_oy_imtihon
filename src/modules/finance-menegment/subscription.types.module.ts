import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription.types.service';
import { SubscriptionPlansController } from './subscription.types.controller';

@Module({
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
