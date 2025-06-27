import { Module } from '@nestjs/common';
import { CoreInitModule } from './core/core.init.module';
import { UserModule } from './modules/users/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/users/auth/auth.module';
import { ProfileModule } from './modules/users/profile/profile.module';
import { MoviesCounterModule } from './modules/file.menegment/movie/movies.module';
import { CategoryModule } from './modules/file.menegment/categories/category.module';
import { AdminModule } from './modules/users/admin/admin.module';
import { SubscriptionPlansModule } from './modules/finance-menegment/subscription.types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CoreInitModule,
    SubscriptionPlansModule,
    // UserModule,
    // AuthModule,
    // ProfileModule,
    // AdminModule,
    // MoviesCounterModule,
    // CategoryModule
  ],
})
export class AppModule {}
