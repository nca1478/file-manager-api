// Dependencies
import { Model, DataTypes } from "sequelize";

// DB Connection
import sequelize from "../../db/connection";

class Image extends Model {}
Image.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: "image",
    }
);

export default Image;
