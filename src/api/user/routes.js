// Validate Data
import {
    createUserValidation,
    loginUserValidation,
    loginGoogleValidation,
} from "./validateData";

// Helpers
import { showValErrors } from "../../middlewares/showValErrors";
import { verifyToken } from "../../helpers/jwtHandler";

class UserRouter {
    constructor(router, controller) {
        this.error = new Error();

        if (!router) {
            this.error.dependencyError = "Express Router is undefined";
            throw this.error.dependencyError;
        } else {
            this.router = router;
        }

        if (!controller) {
            this.error.dependencyError = "Controller is undefined";
            throw this.error.dependencyError;
        } else {
            this.controller = controller;
        }

        // Create New User
        this.router.post(
            "/",
            [createUserValidation(), showValErrors],
            this.controller.create.bind(this.controller)
        );

        // Get Users
        this.router.get(
            "/",
            [verifyToken],
            this.controller.findAll.bind(this.controller)
        );

        // Login User
        this.router.post(
            "/login",
            [loginUserValidation(), showValErrors],
            this.controller.login.bind(this.controller)
        );

        // Login Google
        this.router.post(
            "/google",
            [loginGoogleValidation(), showValErrors],
            this.controller.google.bind(this.controller)
        );
    }

    setRoutes() {
        return this.router;
    }
}

export default UserRouter;
