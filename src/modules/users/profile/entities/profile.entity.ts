import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../user/entities/user.entity';
import { Models } from 'src/core/types/users.types';

@Table({
  tableName: Models.Profile,
  createdAt: true,
  updatedAt: true,
})
export class Profile extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.STRING })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare user_id: string;

  @BelongsTo(() => User)
  user: User;
  @Default('Enter your full_name')
  @Column({ type: DataType.STRING })
  declare full_name?: string;

  @Default('Enter your phone')
  @Column({ type: DataType.STRING })
  declare phone?: string;

  @Default('Enter your country')
  @Column({ type: DataType.STRING })
  declare conutry_id?: string;
}
