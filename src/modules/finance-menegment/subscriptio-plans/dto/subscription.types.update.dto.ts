import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionPlansDto } from './subscription.types.create.dto';

export class UpdateSubscriptionPlansDto extends PartialType(
  CreateSubscriptionPlansDto,
) {}
