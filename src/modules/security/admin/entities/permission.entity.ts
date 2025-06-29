import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../users/user/entities/user.entity';
import { Actions, Models } from 'src/core/types/users.types';

@Table({
  tableName: 'permissions',
  timestamps: false,
})
export class Permission extends Model {
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

  @Column({
    type: DataType.ARRAY(DataType.ENUM(...Object.values(Actions))),
  })
  declare actions: Actions[];

  @Column({
    type: DataType.ENUM(...Object.values(Models)),
  })
  declare model: string;
}
