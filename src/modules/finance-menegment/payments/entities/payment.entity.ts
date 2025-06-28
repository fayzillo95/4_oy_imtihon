import { Column, DataType, Model, Table } from "sequelize-typescript"
import { Json } from "sequelize/types/utils"

@Table({
    tableName : "payments",
    createdAt : true,
    updatedAt : true
})
export class Payment extends Model{
    
    @Column({
        type : DataType.STRING
    })
    declare id : string
    
    @Column({
        type : DataType.STRING
    })
    declare user_subscription_id : string
    
    @Column({
        type : DataType.STRING
    })
    declare amount : number
    
    @Column({
        type : DataType.JSON
    })
    declare payment_method : Json
    
    @Column({
        type : DataType.JSON
    })
    declare payment_details : Json
    
    @Column({
        type : DataType.ARRAY
    })
    declare status : string[]
    
    @Column({
        type : DataType.STRING
    })
    declare external_transaction_id : string
}
`
id: UUID PRIMARY KEY
user_subscription_id: UUID FOREIGN KEY REFERENCES user_subscriptions(id)
amount: DECIMAL(10, 2)
payment_method: ENUM('card', 'paypal', 'bank_transfer', 'crypto')
payment_details: JSON
status: ENUM('pending', 'completed', 'failed', 'refunded')
external_transaction_id: VARCHAR(100)
created_at: TIMESTAMP DEFAULT NOW()
`