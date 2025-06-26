import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Subscription_type } from "src/core/types/movies.types";



@Table({
  tableName: "movies",
  underscored: true,
  createdAt: true,
  updatedAt: true,
})
export class MoviesCounter extends Model {
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

  @Column({ type: DataType.DECIMAL(3, 1), defaultValue: 0.0 })
  declare rating: number;

  @Column({
    type: DataType.ENUM(...Object.values(Subscription_type)),
    defaultValue: Subscription_type.free,
  })
  declare subscription_type: Subscription_type;
}


@Table({ tableName: "categories", updatedAt :false, createdAt : true })
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

@Table({
  tableName: "movie_files",
  underscored: true,
  createdAt: true,
  updatedAt: true,
})
export class MovieFile extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.STRING })
  declare id: string;

  @ForeignKey(() => MoviesCounter)
  @Column({ type: DataType.STRING, allowNull: false })
  declare movie_id: string;

  @BelongsTo(() => MoviesCounter)
  movie: MoviesCounter;

  @Column({ type: DataType.STRING })
  declare file_url: string;

  @Column({
    type: DataType.ENUM("240p", "360p", "480p", "720p", "1080p", "4K"),
    allowNull: false,
  })
  declare quality: "240p" | "360p" | "480p" | "720p" | "1080p" | "4K";

  @Column({ type: DataType.STRING, defaultValue: "uz" })
  declare language: string;
}