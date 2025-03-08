import { DataTypes } from "sequelize";

export function createModel(database){
    database.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
}