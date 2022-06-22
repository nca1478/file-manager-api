// Validate Data
import {
    createUserValidation,
    loginUserValidation,
    loginGoogleValidation,
    emailRecoveryValidation,
    recoveryPassValidation,
} from "./validateData";

// Helpers
import { showValErrors } from "../../middlewares/showValErrors";
import { accountToken, verifyToken } from "../../helpers/jwtHandler";

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

        // Send Email to Recover Password
        this.router.put(
            "/recovery",
            [emailRecoveryValidation(), showValErrors],
            this.controller.sendEmailRecovery.bind(this.controller)
        );

        // Recover password
        this.router.put(
            "/recovery/:token",
            [recoveryPassValidation(), accountToken, showValErrors],
            this.controller.recoveryPass.bind(this.controller)
        );
    }

    setRoutes() {
        return this.router;
    }
}

export default UserRouter;
