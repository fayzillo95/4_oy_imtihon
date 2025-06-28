import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {  Movies} from 'src/modules/file.menegment/movie/entities/movies.entity';
import { MovieCategories } from 'src/modules/file.menegment/movie/entities/movie.categories';
import { MovieCategory } from 'src/modules/file.menegment/movie/entities/category.entity';
import { MovieFile } from 'src/modules/file.menegment/movie/entities/movie_file.entity';

import { Profile } from 'src/modules/users/profile/entities/profile.entity';
import { User } from 'src/modules/users/user/entities/user.entity';
import { Favorite } from 'src/modules/users/user-favorite/entities/favorite.entity';
import { SubscriptionPlans } from 'src/modules/finance-menegment/subscriptio-plans/entities/subscription.types.entity';
import { Reviews } from 'src/modules/users/user-reviews/entities/user-review.entity';
import { WatchHistory } from 'src/modules/users/watch-history/entities/watch-history.entity';
import { Permission } from 'src/modules/security/admin/entities/permission.entity';
import { UserSubscription } from 'src/modules/finance-menegment/user_subscriptions/entities/user_subscription.entity';
import { Payment } from 'src/modules/finance-menegment/payments/entities/payment.entity';

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
            Favorite,
            SubscriptionPlans,
            Reviews,
            WatchHistory,
            Permission,
            UserSubscription,
            Payment,
            
        ],
        logQueryParameters : false,
        logging : false
      }),
    }),
  ],
})
export class DatabaseConnectModule {}
