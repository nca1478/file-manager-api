// Helpers
import { showValErrors } from "../../middlewares/showValErrors";
import { verifyToken } from "../../helpers/jwtHandler";

class ImageRouter {
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

        // Upload User Images
        this.router.post(
            "/upload",
            [verifyToken, showValErrors],
            this.controller.upload.bind(this.controller)
        );
    }

    setRoutes() {
        return this.router;
    }
}

export default ImageRouter;
