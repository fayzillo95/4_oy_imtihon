import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { BasedModel } from "src/core/types/users.types";
import { User } from "../../user/entities/user.entity";
import { Movies } from "src/modules/file.menegment/movie/entities/movies.entity";
import { v4 as uuidv4 } from "uuid"

@Table({
    tableName: "fowarites",
    timestamps: true
})
export class Favorite extends Model {
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


