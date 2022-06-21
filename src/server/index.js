// Dependencies
import express from "express";
import logger from "morgan";
import chalk from "chalk";
import cors from "cors";
import fileUpload from "express-fileupload";

// Api Debugging Messages
const debug = require("debug")("interviewApp:DB");

// Api Routes
import { userRoutes } from "../api/user";

// DB Connection and Associations
import sequelize from "../db/connection";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Api Settings
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Enable Cors
        this.app.use(cors());
        this.app.use(
            logger(
                ":method :url :status :response-time ms - :res[content-length] [:date[clf]] :remote-addr"
            )
        );

        // Bodyparser
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // Enable Static Files
        this.app.use(express.static("public"));

        // Enable Express Fileupload
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "/tmp/",
                createParentPath: true,
            })
        );
    }

    routes() {
        this.app.use("/api/v1/users", userRoutes);
    }

    listen() {
        const port = process.env.PORT;
        this.app.listen(port, () => {
            console.log(
                `${chalk.yellow(
                    "[interviewApp:API]"
                )} Listening on port ${port}`
            );
        });
    }

    startDBConnection() {
        sequelize
            .sync({ force: false })
            .then(() => {
                debug("Database connection succesfully");
                console.log(
                    `${chalk.yellow(
                        "[interviewApp:DB]"
                    )} Database connection succesfully`
                );
            })
            .catch((error) => {
                console.log(error);
                console.log(
                    `${chalk.red(
                        "[interviewApp:DB]"
                    )} Database connection error ${error}`
                );
            });
    }
}

module.exports = Server;
