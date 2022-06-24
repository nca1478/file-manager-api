// Dependencies
import Sequelize from "sequelize";

// Helpers
import { localConnection, remoteConnection } from "../helpers/dbConnection";

// DB Connection (remote y local)
const SSL = process.env.SSL == "true" ? true : false;
const sequelize = SSL
    ? remoteConnection(Sequelize)
    : localConnection(Sequelize);

module.exports = sequelize;
