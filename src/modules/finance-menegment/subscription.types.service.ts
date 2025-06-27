import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlansDto } from './dto/subscription.types.create.dto';
import { UpdateSubscriptionPlansDto } from './dto/subscription.types.update.dto';

@Injectable()
export class SubscriptionPlansService {
  create(data: CreateSubscriptionPlansDto) {
    return 'This action adds a new financeMenegment';
  }

  findAll() {
    return `This action returns all financeMenegment`;
  }

  findOne(id: string) {
    return `This action returns a #${id} financeMenegment`;
  }

  update(id: string, data: UpdateSubscriptionPlansDto) {
    return `This action updates a #${id} financeMenegment`;
  }

  remove(id: string) {
    return `This action removes a #${id} financeMenegment`;
  }
}
