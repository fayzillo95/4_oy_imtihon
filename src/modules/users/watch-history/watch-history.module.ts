import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { WatchHistoryController } from './watch-history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchHistory } from './entities/watch-history.entity';
import { User } from '../user/entities/user.entity';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';

@Module({
  imports: [SequelizeModule.forFeature([WatchHistory, User, Movies])],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService],
})
export class WatchHistoryModule {}
