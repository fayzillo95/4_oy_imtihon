import {
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { UserSubscription } from '../../user_subscriptions/entities/user_subscription.entity';
import { Models } from 'src/core/types/users.types';

@Table({
  tableName: Models.Subscription_plans,
})
export class SubscriptionPlans extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.STRING,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;
 // price
  @Column({
    type: DataType.INTEGER,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare duration_days: number;

  @Column({
    type: DataType.JSON,
  })
  declare features: {[key : string] : any}[];

  @Default(() => false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isActive: boolean;

  @HasMany(() => UserSubscription)
  subscriptions: UserSubscription[];
}

