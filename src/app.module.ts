import { Module } from '@nestjs/common';
import { CoreInitModule } from './core/core.init.module';
import { UserModule } from './modules/users/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/security/auth/auth.module';
import { ProfileModule } from './modules/users/profile/profile.module';
import { MoviesCounterModule } from './modules/file.menegment/movie/movies.module';
import { CategoryModule } from './modules/file.menegment/categories/category.module';
import { AdminModule } from './modules/security/admin/admin.module';
import { SubscriptionPlansModule } from './modules/finance-menegment/subscriptio-plans/subscription.types.module';
import { PaymentsModule } from './modules/finance-menegment/payments/payments.module';
import { FavoritesModule } from './modules/users/user-favorite/favorites.module';
import { UserSubscriptionsModule } from './modules/finance-menegment/user_subscriptions/user_subscriptions.module';
import { WatchHistoryModule } from './modules/users/watch-history/watch-history.module';
import { UserReviewsModule } from './modules/users/user-reviews/user-reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CoreInitModule,
    // SubscriptionPlansModule,
    // PaymentsModule,
    // FavoritesModule,
    // UserSubscriptionsModule,
    UserModule,
    AuthModule,
    // ProfileModule,
    AdminModule,
    MoviesCounterModule,
    // CategoryModule,
    // WatchHistoryModule,
    // UserReviewsModule
  ],
})
export class AppModule {}
