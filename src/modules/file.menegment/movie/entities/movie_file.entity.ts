import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import {  QualityType } from 'src/core/types/movies.types';
import { Movies } from './movies.entity';


@Table({
  tableName : "movie_files",
  updatedAt : false,
  createdAt : true
})
export class MovieFile extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.STRING })
  declare id: string;

  @ForeignKey(() => Movies)
  @Column({ type: DataType.STRING, allowNull: false })
  declare movie_id: string;

  @BelongsTo(() => Movies)
  movie : Movies

  @Column({ type: DataType.STRING })
  declare file_url: string;

  @Column({
    type: DataType.ENUM(...Object.keys(QualityType)),
    allowNull: false,
  })
  declare quality: typeof QualityType;

  @Column({
    type : DataType.DECIMAL(3,2)
  })
  declare size_mb : number

  @Column({ type: DataType.STRING, defaultValue: 'uz' })
  declare language: string;
}
