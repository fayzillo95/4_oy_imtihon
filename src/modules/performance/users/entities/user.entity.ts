import { DataType } from "sequelize-typescript"
import { Column, Model, Table } from "sequelize-typescript";
import {v4 as uuidv4} from "uuid"

@Table({ 
    tableName : "users",
    createdAt : true,
    updatedAt : false
})
export class User extends Model {
    @Column({
        type : DataType.STRING,
        primaryKey : true,
        unique : true,
        defaultValue : () => uuidv4()
    })
    declare id? : string
    @Column({
        type : DataType.STRING,
        unique : true
    })
    declare username : string
    @Column({
        type : DataType.STRING,
        unique : true
    })
    declare email : string
    @Column({
        type : DataType.STRING
    })
    declare password : string
    @Column({
        type : DataType.BOOLEAN,
        defaultValue: false
    })
    declare isVerify : boolean
    @Column({
        type : DataType.STRING,
        allowNull : true,
        defaultValue : "user"
    })
    declare role? : string
}
