import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { User } from 'src/modules/users/user/entities/user.entity';
import { UserSubscription } from '../user_subscriptions/entities/user_subscription.entity';
import { SubscriptionPlans } from '../subscriptio-plans/entities/subscription.types.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentsModel: typeof Payment,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(UserSubscription) private readonly u_planModel : typeof UserSubscription,
    @InjectModel(SubscriptionPlans) private readonly planModel : typeof SubscriptionPlans
  ) {}

  async create(data : CreatePaymentDto, user_id : string) {
    const {user_subscription_id : u_sb_id, payment_method,payment_details : detailes} = data
    const user_sub = await this.u_planModel.findOne({where : {user_id : u_sb_id}})

    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
