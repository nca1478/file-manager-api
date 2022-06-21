// Dependencies
import bcrypt from "bcryptjs";

// Helpers
import { responseError, responsePOST } from "../../helpers/response";
import { sendTokenUser } from "../../helpers/sendToken";

// Service Class
import UserService from "./service";

class UserController extends UserService {
    constructor(dependenciesData) {
        super(dependenciesData);
        this.error = new Error();
    }

    async create(req, res) {
        try {
            const dataUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            };
            const result = await this.createUser(dataUser);
            const response = responsePOST({
                msg: "Create Successfully.",
                user: result,
                token: sendTokenUser(result),
            });
            return res.status(201).json(response);
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }
}

export default UserController;
