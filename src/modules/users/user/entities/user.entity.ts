import { DataType, Default, HasOne, PrimaryKey } from 'sequelize-typescript';
import { Column, Model, Table } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../../profile/entities/profile.entity';

@Table({
  tableName: 'users',
  createdAt: true,
  updatedAt: false,
})
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

  @HasOne(() => Profile)
  profile: Profile;
}
