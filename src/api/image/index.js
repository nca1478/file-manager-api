// Dependencies
import express from "express";

// Models
import Image from "./model";
import User from "../user/model";

// Image Dependencies
import ImageController from "./controller";
import ImageRouter from "./routes";

const dataDependencies = { image: Image, user: User };

// Injecting Dependencies
const router = express.Router();
const imageController = new ImageController(dataDependencies);
const imageRouter = new ImageRouter(router, imageController);
const imageRoutes = imageRouter.setRoutes();

export { imageRoutes };
