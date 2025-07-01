import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Subscription_type } from 'src/core/types/movies.types';
import { MovieCategories } from './movie.categories';
import { MovieFile } from './movie_file.entity';
import { Favorite } from 'src/modules/users/user-favorite/entities/favorite.entity';
import { WatchHistory } from 'src/modules/users/watch-history/entities/watch-history.entity';
import { Reviews } from 'src/modules/users/user-reviews/entities/user-review.entity';
import { Models } from 'src/core/types/users.types';

@Table({
  tableName: Models.Movies,
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
    type: DataType.INTEGER,
  })
  declare view_count: number;

  @Column({
    type: DataType.ENUM(...Object.values(Subscription_type)),
    defaultValue: Subscription_type.free,
  })
  declare subscription_type: Subscription_type;

  @HasMany(() => MovieCategories)
  categories: MovieCategories[];

  @HasOne(() => MovieFile)
  movie_file: MovieFile;

  @HasMany(() => Favorite)
  favorite: Favorite[];

  @HasMany(() => WatchHistory)
  watch_hitory: WatchHistory[];

  @HasMany(() => Reviews)
  reviews: Reviews;
}
