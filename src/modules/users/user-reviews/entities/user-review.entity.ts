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
import { User } from '../../user/entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'reviews',
  createdAt: true,
  updatedAt: false,
})
export class Reviews extends Model {
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

  @ForeignKey(() => Movies)
  @Column({ type: DataType.STRING, allowNull: false })
  declare movie_id: string;
  @BelongsTo(() => Movies)
  movie: Movies;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;

  @Default('No comment ! ')
  @Column({
    type: DataType.STRING,
  })
  comment: string;
}
