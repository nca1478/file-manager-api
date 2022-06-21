// Validate Data
import { createUserValidation } from "./validateData";

// Helpers
import { showValErrors } from "../../middlewares/showValErrors";

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
    }

    setRoutes() {
        return this.router;
    }
}

export default UserRouter;
