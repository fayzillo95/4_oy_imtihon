import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey } from "sequelize-typescript";
import { Movies } from "src/modules/file.menegment/movie/entities/movies.entity";
import { User } from "src/modules/users/user/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';


export enum UserRole{
    ADMIN="admin",
    SUPER_ADMIN="super_admin",
    USER="user"
}

export enum Actions{
    GET="GET",
    POST="POST",
    PATCH="PATCH",
    DELETE="DELETE"
}
/**
 * 
 * // Permission modeliga MOdels enum types
 */
export enum Models{
    Profile="profile",
    Categoris="categories",
    Movies="movies",
    MovieFile="movie_file",
    MovieCategories="movie_categories",
    Users="users",
    Payments="payments",
    Subscriptions="subscriptions",
    Subscription_plans="subscription_plans",
    User_subscriptions="user_subscriptions"
}

/**
 *  // User_subscriptions jadval statusi 
 * 
 */
export enum PlansStatus{
    ACTIVE = 'active', 
    EXPIRED = 'expired', 
    CANCELED = 'canceled', 
    PENDING_PAYMENT='pending_payment'
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
export enum PaymentsStatus{
    PENNDING = 'pending', 
    COMPLIETED='completed', 
    FAILED='failed', 
    REFUNDED='refunded'
}

export class BasedModel extends Model {
    @PrimaryKey
    @Default(() => uuidv4())
    @Column({
        type: DataType.STRING
    })
    declare id: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    declare user_id: string
    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Movies)
    @Column({ type: DataType.STRING, allowNull: false })
    declare movie_id: string;
    @BelongsTo(() => Movies)
    movie: Movies

}

`
status: ENUM('active', 'expired', 'canceled', 'pending_payment')
     DEFAULT 'pending_payment'

payment_method: ENUM('card', 'paypal', 'bank_transfer', 'crypto')
status: ENUM('pending', 'completed', 'failed', 'refunded')

subscription_type: ENUM('free', 'premium') DEFAULT 'free'

`