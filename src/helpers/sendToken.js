// Dependencies
import jwt from "jsonwebtoken";

// JWT Values
import jwtConfig from "../config/jwt";

const sendTokenUser = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        google: user.google,
        createdAt: user.createdAt,
    };

    return jwt.sign(payload, jwtConfig.secret, jwtConfig.expirationUser);
};

export { sendTokenUser };
