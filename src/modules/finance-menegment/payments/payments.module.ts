import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user/entities/user.entity';
import { UserSubscription } from '../user_subscriptions/entities/user_subscription.entity';
import { SubscriptionPlans } from '../subscriptio-plans/entities/subscription.types.entity';

@Module({
  imports: [SequelizeModule.forFeature([Payment, User,UserSubscription,SubscriptionPlans])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
