import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { MovieCategory } from './category.entity';
import { Movies } from './movies.entity';

@Table({ tableName: 'movie_categories' })
export class MovieCategories extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.STRING)
  declare id: string;

  @ForeignKey(() => Movies)
  @Column({ type: DataType.STRING, field: 'movie_id' }) // <-- BU MUHIM!
  declare movie_id: string;

  @ForeignKey(() => MovieCategory)
  @Column({ type: DataType.STRING, field: 'category_id' }) // <-- BU MUHIM!
  declare category_id: string;

  @BelongsTo(() => Movies)
  movie: Movies;

  @BelongsTo(() => MovieCategory)
  category: MovieCategory;
}


