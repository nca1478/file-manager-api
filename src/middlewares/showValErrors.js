// Dependencies
import { validationResult } from "express-validator";
import { responseError } from "../helpers/response";

// Helpers

const showValErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(responseError(errors.array()));
    }
    next();
};

module.exports = { showValErrors };
