import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Movies])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
