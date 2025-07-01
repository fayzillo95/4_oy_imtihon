import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { User } from 'src/modules/users/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserSubscription } from './entities/user_subscription.entity';
import { SubscriptionPlans } from '../subscriptio-plans/entities/subscription.types.entity';
import { Op } from 'sequelize';
import { PlansStatus } from 'src/core/types/users.types';

@Injectable()
export class UserSubscriptionsService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(SubscriptionPlans) private readonly plansModel: typeof SubscriptionPlans,
    @InjectModel(UserSubscription) private readonly u_plansModel: typeof UserSubscription
  ) { }

  async create(data: CreateUserSubscriptionDto, user_id: string) {
    const user = await this.userModel.findOne({ where: { id: user_id } })
    if (!user) throw new NotFoundException("User not found !")

    const plan = await this.plansModel.findOne({ where: { id: data.plan_id } })
    if (!plan) throw new NotFoundException("SubscriptionPlan not found !")

    const oldU_Subscriptoin = await this.u_plansModel.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { plan_id: data.plan_id }
        ]
      }
    })
    if (oldU_Subscriptoin) throw new BadRequestException(`
      [${user.username}] already bought plan [${plan.name}]
      status : [${oldU_Subscriptoin.status}]
      `)

    const newU_Subscription = await this.u_plansModel.create({
      user_id: user_id,
      plan_id: plan.id,
      status: PlansStatus.PENDING_PAYMENT,
      auto_renew: data.auto_renew
    })
    return {
      message: 'This action adds a new userSubscription',
      data: newU_Subscription
    };
  }

  async findAll() {
    const data = await this.u_plansModel.findAll({
      include : {model : SubscriptionPlans,attributes : ["name","features"]}
    })
    return {
      message: `This action returns all userSubscriptions`,
      data
    };
  }
  async findAllByUserId(user_id: string) {
    const data = await this.plansModel.findOne({
      where: { user_id: user_id }
    })
    return {
      message: `This action returns a #[ ${user_id} ] userSubscription`,
      data
    }
  }
  async findOne(id: string) {
    const u_SubScription = await this.plansModel.findOne({
      where: { id: id }
    })
    return {
      message: `This action returns a #${id} userSubscription`,
      data: u_SubScription
    };
  }

  async update(id: string, data: UpdateUserSubscriptionDto) {
    const u_SubScription = await this.plansModel.findOne({
      where: { id: id }
    })
    if (!u_SubScription) throw new NotFoundException(`User Subscription not found by id : [ ${id} ]`)
    await u_SubScription.update({...data})
    return {
      message : `This action updates a #${id} userSubscription`,
      data : u_SubScription
    };
  }

  async remove(id: string) {
    const u_SubScription = await this.plansModel.findOne({
      where: { id: id }
    })
    if (!u_SubScription) throw new NotFoundException(`User Subscription not found by id : [ ${id} ]`)
    await u_SubScription.destroy()
    return {
      message : `This action removes a #${id} userSubscription`,
      data : u_SubScription
    };
  }
}
