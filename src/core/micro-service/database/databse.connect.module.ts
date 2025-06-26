import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  MovieCategory,
  MovieFile,
  Movies,
} from 'src/modules/file.menegment/movie/entities/movies.entity';
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
            // MovieCategory, 
            // Movies, 
            // MovieFile,
        ],
      }),
    }),
  ],
})
export class DatabaseConnectModule {}
