import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import { Movies } from 'src/modules/file.menegment/movie/entities/movies.entity';
import { User } from 'src/modules/users/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  USER = 'user',
}

export enum Actions {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
/**
 *
 * // Permission modeliga MOdels enum types
 */
export enum Models {
  Categoris = 'categories',
  Favortie = 'favorites',
  MovieCategories = 'movie_categories',
  MovieFile = 'movie_files',
  Movies = 'movies',
  Payments = 'payments',
  Permission = 'permissions',
  Profile = 'profile',
  Reviews = 'reviews',
  Subscription_plans = 'subscription_plans',
  User_subscriptions = 'user_subscriptions',
  Users = 'users',
  WatchHistory = 'watch_history',
}

/**
 *  // User_subscriptions jadval statusi
 *
 */
export enum PlansStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
  PENDING_PAYMENT = 'pending_payment',
}

/**
 * Payments jadval statusi
 * ```
 *  id: UUID PRIMARY KEY
 *  user_subscription_id: UUID FOREIGN KEY REFERENCES user_subscriptions(id)
 *  amount: DECIMAL(10, 2)
 *  payment_method: ENUM('card', 'paypal', 'bank_transfer', 'crypto')
 *  payment_details: JSON
 *  status: ENUM('pending', 'completed', 'failed', 'refunded')
 *  external_transaction_id: VARCHAR(100)
 *  created_at: TIMESTAMP DEFAULT NOW()
 *  ```
 */
export enum PaymentsStatus {
  PENNDING = 'pending',
  COMPLIETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentsMethods{
  CARD = 'card', 
  PAYPAL = 'paypal', 
  BANK_TRANSFER = 'bank_transfer', 
  CRYPTO = 'crypto'
}