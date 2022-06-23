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
                msg: "Usuario creado exitosamente.",
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
                    msg: "Login exitoso.",
                    user: result,
                    token: sendTokenUser(result),
                };
                const response = responsePOST(data);
                return res.status(200).json(response);
            } else {
                if (result === null) {
                    const error = responseError({
                        msg: "Email no existe o usuario no está activo",
                    });
                    return res.status(404).json(error);
                } else {
                    const error = responseError({
                        msg: "Combinación de email y password no coincide",
                    });
                    return res.status(401).json(error);
                }
            }
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }

    async google(req, res) {
        try {
            const tokenId = req.body.tokenId;
            let result = await this.loginGoogle(tokenId);
            if (result) {
                const data = {
                    msg: "Login de Google exitoso",
                    user: result,
                    token: sendTokenUser(result),
                };
                const response = responsePOST(data);
                return res.status(200).json(response);
            } else {
                const error = responseError({
                    msg: "Usuario no está activo",
                });
                return res.status(404).json(error);
            }
        } catch (err) {
            const error = responseError([err]);
            res.status(500).json(error);
        }
    }

    async sendEmailRecovery(req, res) {
        try {
            let email = req.body.email;
            let result = await this.sendEmailRecoveryPass(email);
            if (result) {
                const data = {
                    msg: "Email enviado exitosamente",
                    messageId: result.messageId,
                };
                const response = responsePOST(data);
                return res.status(200).json(response);
            } else {
                const error = responseError({
                    msg: "Email no encontrado o no habilitado para cambiar contraseña",
                });
                return res.status(401).json(error);
            }
        } catch (err) {
            const error = responseError([err]);
            return res.status(500).json(error);
        }
    }

    async recoveryPass(req, res) {
        try {
            const data = {
                email: req.body.email,
                password: req.body.newPassword,
                token: req.params.token,
            };
            let result = await this.recoveryPassword(data);
            if (result) {
                if (result.accepted[0].length > 0) {
                    const dataResponse = {
                        msg: "Contraseña cambiada exitosamente",
                        messageId: result.messageId,
                    };
                    const response = responsePOST(dataResponse);
                    return res.status(200).json(response);
                } else {
                    const error = responseError({
                        msg: "Error recuperando contraseña. Intente nuevamente",
                    });
                    return res.status(400).json(error);
                }
            } else {
                const error = responseError({
                    msg: "Error recuperando contraseña. Token no es correcto o usuario no encontrado",
                });
                return res.status(400).json(error);
            }
        } catch (err) {
            const error = responseError([err]);
            return res.status(500).json(error);
        }
    }
}

export default UserController;
