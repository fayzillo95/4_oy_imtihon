import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionPlansDto } from './dto/subscription.types.create.dto';
import { UpdateSubscriptionPlansDto } from './dto/subscription.types.update.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlans } from './entities/subscription.types.entity';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectModel(SubscriptionPlans)
    private readonly plansModel: typeof SubscriptionPlans,
  ) { }
  async create(data: CreateSubscriptionPlansDto) {
    const [record, created] = await this.plansModel.findOrCreate({
      where: { name: data.name },
      defaults: { ...data }
    })

    if (!created) {
      throw new BadRequestException(`Plan already exists name: [ ${data.name} ]`)
    }

    return {
      message: 'Plan created successfully',
      data: record,
    };

  }

  async findAll() {
    const plans = await this.plansModel.findAll()
    return {
      message: `This action returns all financeMenegment`,
      data: plans
    };
  }

  async findOne(id: string) {
    const plan = await this.plansModel.findOne({ where: { id: id } })
    return {
      message: `This action returns a #${id} financeMenegment`,
      data: plan
    };
  }

  async update(id: string, data: UpdateSubscriptionPlansDto) {
    const plan = await this.plansModel.findOne({ where: { id: id } })
    if (!plan) throw new NotFoundException("Plan not found !")
    const updatedPlan = await this.plansModel.update({ ...data }, {
      where: { id: id },
      returning: true
    })
    return {
      message: `This action updates a #${id} financeMenegment`,
      oldData: plan,
      updatedPlan
    };
  }

  async remove(id: string) {
    const plan = await this.plansModel.findOne({ where: { id: id } })
    if (!plan) throw new NotFoundException("Plan not found !")
    const data = plan.toJSON()
    await plan.destroy()
    return {
      message: `This action removes a #${id} financeMenegment`,
      oldData: plan,
    };
  }
}
