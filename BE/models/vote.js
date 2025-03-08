import { DataTypes } from "sequelize";

export function createModel(database){
    database.define('Vote', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.INTEGER,
            validate: {
                isIn: [[1, -1]], // Consente solo 1 (upvote) o -1 (downvote)
            },
        },
    })
}