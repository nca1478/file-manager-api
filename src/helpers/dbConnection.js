// DB Connection Values
import { config } from "../config/env";
const { dbName, dbUser, dbPass, dbHost } = config;

export const remoteConnection = (Sequelize) => {
    return new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        dialect: "mysql",
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,
            },
        },
    });
};

export const localConnection = (Sequelize) => {
    return new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        dialect: "mysql",
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    });
};
