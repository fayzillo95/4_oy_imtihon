import {
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BasedModel } from 'src/core/types/users.types';
import { User } from '../../user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';

@Table({
  tableName: 'watch_history',
  timestamps: true,
})
export class WatchHistory extends Model {
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
  })
  declare watched_duration: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
  })
  declare watched_percentage: number;

  @Default(() => new Date())
  @Column({
    type: DataType.DATE,
  })
  declare last_watched: Date;

  @BeforeUpdate
  static preventImmutableUpdates(instance: WatchHistory) {
    instance.last_watched = new Date();
  }
}
