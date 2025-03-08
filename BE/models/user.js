import { DataTypes } from "sequelize";


export function createModel(database) {
    database.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) { //hash the password before saving it
                let hash = createHash("sha256");    
                this.setDataValue('password', hash.update(value).digest("hex"));
              },
              avatar: {
                type: DataTypes.STRING,
                allowNull: true,
              },
        }
    });
}