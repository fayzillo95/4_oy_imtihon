import {
  DataType,
  Default,
  HasMany,
  HasOne,
  PrimaryKey,
} from 'sequelize-typescript';
import { Column, Model, Table } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../../profile/entities/profile.entity';
import { Favorite } from '../../user-favorite/entities/favorite.entity';
import { WatchHistory } from '../../watch-history/entities/watch-history.entity';
import { Reviews } from '../../user-reviews/entities/user-review.entity';
import { Permission } from 'src/modules/security/admin/entities/permission.entity';
import { UserSubscription } from 'src/modules/finance-menegment/user_subscriptions/entities/user_subscription.entity';
import { Models } from 'src/core/types/users.types';

@Table({
  tableName: Models.Users,
  createdAt: true,
  updatedAt: false,
})
/**
 * @proporty id: UUID PRIMARY KEY
 * @proporty username: VARCHAR(50) UNIQUE
 * @proporty email: VARCHAR(100) UNIQUE
 * @proporty password_hash: VARCHAR(255)
 * @proporty role: ENUM('user', 'admin', 'superadmin') DEFAULT 'user'
 * @proporty avatar_url: VARCHAR(255)
 * @proporty created_at: TIMESTAMP DEFAULT NOW()
 *
 */
export class User extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.STRING,
  })
  declare id?: string;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;
  @Column({
    type: DataType.STRING,
  })
  declare password: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isVerify: boolean;
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'user',
  })
  declare role?: string;

  @HasOne(() => Profile,{onDelete: 'CASCADE'})
  profile: Profile;

  @HasMany(() => Favorite,{onDelete: 'CASCADE'})
  favorite: Favorite[];

  @HasMany(() => WatchHistory,{onDelete: 'CASCADE'})
  watch_history: WatchHistory[];

  @HasMany(() => Reviews,{onDelete: 'CASCADE'})
  reciews: Reviews[];

  @HasMany(() => Permission,{onDelete: 'CASCADE'})
  permissions: Permission[];

  @HasMany(() => UserSubscription,{onDelete: 'CASCADE'})
  subscriptions: UserSubscription[];
}
// cascade qo'shildi 