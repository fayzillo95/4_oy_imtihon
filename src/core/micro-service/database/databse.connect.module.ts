import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {  Movies} from 'src/modules/file.menegment/movie/entities/movies.entity';
import { MovieCategories } from 'src/modules/file.menegment/movie/entities/movie.categories';
import { MovieCategory } from 'src/modules/file.menegment/movie/entities/category.entity';
import { MovieFile } from 'src/modules/file.menegment/movie/entities/movie_file.entity';

import { Profile } from 'src/modules/users/profile/entities/profile.entity';
import { User } from 'src/modules/users/user/entities/user.entity';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        uri: config.get<string>('DATABASE_URL'),
        synchronize: true,
        autoLoadModels: true,
        models: [
            User, 
            Profile, 
            Movies, 
            MovieFile,
            MovieCategory, 
            MovieCategories,
        ],
      }),
    }),
  ],
})
export class DatabaseConnectModule {}
