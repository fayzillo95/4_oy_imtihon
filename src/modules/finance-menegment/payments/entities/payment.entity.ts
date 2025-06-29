import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserSubscription } from '../../user_subscriptions/entities/user_subscription.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'payments',
  createdAt: true,
  updatedAt: true,
})
export class Payment extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.STRING,
  })
  declare id: string;

  @ForeignKey(() => UserSubscription)
  @Column({
    type: DataType.STRING,
  })
  declare user_subscription_id: string;

  @BelongsTo(() => UserSubscription)
  user_subscription: UserSubscription;

  @Column({
    type: DataType.STRING,
  })
  declare amount: number;

  @Column({
    type: DataType.JSON,
  })
  declare payment_method: string[];

  @Column({
    type: DataType.JSON,
  })
  declare payment_details: string[];

  @Column({
    type: DataType.JSON,
  })
  declare status: string[];

  @Column({
    type: DataType.STRING,
  })
  declare external_transaction_id: string;
}
