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


@Table({ tableName: 'categories', updatedAt: false, createdAt: true })
export class MovieCategory extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.STRING })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING, unique: true })
  declare slug: string;

  @Column({ type: DataType.TEXT })
  declare description: string;
}
