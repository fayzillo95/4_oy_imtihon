import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import {  Subscription_type } from 'src/core/types/movies.types';

@Table({
  tableName: 'movies',
  underscored: true,
  createdAt: true,
  updatedAt: true,
})
export class Movies extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.STRING })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare title: string;

  @Column({ type: DataType.STRING })
  declare slug: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ type: DataType.INTEGER })
  declare release_year: number;

  @Column({ type: DataType.INTEGER })
  declare duration_minutes: number;

  @Column({ type: DataType.STRING })
  declare poster_url: string;

  @Column({ type: DataType.DECIMAL(3, 1), defaultValue: Number(0) })
  declare rating: number;
  
  @Default(0)
  @Column({
    type : DataType.INTEGER
  })
  declare view_count : number

  @Column({
    type: DataType.ENUM(...Object.values(Subscription_type)),
    defaultValue: Subscription_type.free,
  })
  declare subscription_type: Subscription_type;
}
