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
  tableName : "movie_categories"
})
export class MovieCategories extends Model{
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type : DataType.STRING
  })
  declare id : string
  
  @Column({
    type : DataType.STRING
  })
  declare movie_id : string
  
  @Column({
    type : DataType.STRING
  })
  declare category_id : string
}

