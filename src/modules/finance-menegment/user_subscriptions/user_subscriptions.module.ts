import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { UserSubscriptionsController } from './user_subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user/entities/user.entity';
import { SubscriptionPlans } from '../subscriptio-plans/entities/subscription.types.entity';
import { UserSubscription } from './entities/user_subscription.entity';

@Module({
  imports: [SequelizeModule.forFeature([
    User, UserSubscription,
    SubscriptionPlans
  ])
  ],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService],
})
export class UserSubscriptionsModule { }
