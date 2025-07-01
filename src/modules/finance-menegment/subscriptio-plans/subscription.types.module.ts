import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription.types.service';
import { SubscriptionPlansController } from './subscription.types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionPlans } from './entities/subscription.types.entity';

@Module({
  imports: [SequelizeModule.forFeature([SubscriptionPlans])],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
