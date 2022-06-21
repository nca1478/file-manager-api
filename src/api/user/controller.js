// Dependencies
import bcrypt from "bcryptjs";

// Helpers
import {
    responseError,
    responseGET,
    responsePOST,
} from "../../helpers/response";
import { paginate } from "../../helpers/pagination";
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

    async findAll(req, res) {
        const page = req.query.page ? req.query.page : 1;
        const limit = req.query.limit ? req.query.limit : 4;

        try {
            const paginationData = paginate(page, limit);
            const result = await this.findUsers(paginationData);
            const response = responseGET(paginationData.pagination, result);
            return res.status(200).json(response);
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }

    async login(req, res) {
        try {
            const dataLogin = {
                email: req.body.email,
                password: req.body.password,
            };
            let result = await this.loginUser(dataLogin);
            if (result) {
                const data = {
                    msg: "Login Successfully.",
                    user: result,
                    token: sendTokenUser(result),
                };
                const response = responsePOST(data);
                return res.status(200).json(response);
            } else {
                if (result === null) {
                    const error = responseError({
                        msg: "The email doesn't exist or user is not active",
                    });
                    return res.status(404).json(error);
                } else {
                    const error = responseError({
                        msg: "The combination of email and password does not exist",
                    });
                    return res.status(401).json(error);
                }
            }
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }
}

export default UserController;
