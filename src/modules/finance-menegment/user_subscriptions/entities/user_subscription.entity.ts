import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../users/user/entities/user.entity';
import { SubscriptionPlans } from 'src/modules/finance-menegment/subscriptio-plans/entities/subscription.types.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Table({
  tableName: 'user_subscriptions',
  timestamps: true,
})
export class UserSubscription extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.STRING,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  declare user_id: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => SubscriptionPlans)
  @Column({
    type: DataType.STRING,
  })
  declare paln_id: string;
  @BelongsTo(() => SubscriptionPlans)
  plans: SubscriptionPlans;

  @Column({
    type: DataType.STRING,
  })
  declare start_date: Date;

  @Column({
    type: DataType.STRING,
  })
  declare end_date: Date;

  @Column({
    type: DataType.STRING,
  })
  declare status: string[];

  @Column({
    type: DataType.STRING,
  })
  declare auto_renew: boolean;

  @HasMany(() => Payment)
  payments: UserSubscription[];
}
