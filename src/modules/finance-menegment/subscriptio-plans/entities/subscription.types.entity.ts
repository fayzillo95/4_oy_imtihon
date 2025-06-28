import { Column, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
    tableName : "subscription_plans"
})
export class SubscriptionPlans extends Model {
    @PrimaryKey
    @Default(() => uuidv4())
    @Column({
        type : DataType.STRING
    })
    declare id :string
    
    @Column({
        type : DataType.STRING
    })
    declare name : string
    
    @Column({
        type : DataType.DECIMAL(2,1)
    })
    declare price : number
    
    @Column({
        type : DataType.STRING
    })
    declare duration_days : number
    
    @Column({
        type : DataType.JSON
    })
    declare features : string[]
    
    @Default(() => false)
    @Column({
        type : DataType.BOOLEAN
    })
    declare isActive : boolean
}
