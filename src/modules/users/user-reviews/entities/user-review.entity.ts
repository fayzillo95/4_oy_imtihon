import { Column, DataType, Default, Table } from "sequelize-typescript";
import { BasedModel } from "src/core/types/users.types";

@Table({
    tableName : "reviews",
    createdAt : true,
    updatedAt : false
})
export class Reviews extends BasedModel{
    
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    rating : number
    
    @Default("No comment ! ")
    @Column({
        type : DataType.STRING
    })
    comment : string
}