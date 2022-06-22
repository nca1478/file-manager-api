// Dependencies
import bcrypt from "bcryptjs";

// Helpers
import { googleVerify } from "../../helpers/googleVerify";

// Queries
import { queryUsersList } from "./queries";

class UserService {
    constructor(dependenciesData) {
        this.error = new Error();

        if (!dependenciesData.user) {
            this.error.dependencyError = "User Model is undefined";
            throw this.error.dependencyError;
        } else {
            this.user = dependenciesData.user;
        }
    }

    async createUser(dataUser) {
        try {
            const result = await this.user.create(dataUser);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async findUsers(paginationData) {
        const { limit, skip } = paginationData;
        const query = queryUsersList(limit, skip);
        return await this.user.findAndCountAll(query);
    }

    setUserInfo = (user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            google: user.google,
            createdAt: user.createdAt,
        };
    };

    async loginUser(dataLogin) {
        const { email, password } = dataLogin;

        try {
            const user = await this.user.findOne({
                where: { email, active: true },
            });
            if (user) {
                let compare = bcrypt.compareSync(password, user.password);
                const userInfo = this.setUserInfo(user);
                if (compare) {
                    return userInfo;
                } else {
                    return compare;
                }
            } else {
                return user;
            }
        } catch (err) {
            throw err;
        }
    }

    async loginGoogle(tokenId) {
        try {
            const { email, name } = await googleVerify(tokenId);
            const user = await this.user.findOne({ where: { email } });
            if (!user) {
                const userInfo = {
                    name,
                    email,
                    password: ":P",
                    google: true,
                };
                const result = await this.user.create(userInfo);
                return result;
            } else {
                if (user.active) {
                    const userInfo = this.setUserInfo(user);
                    return userInfo;
                } else {
                    return null;
                }
            }
        } catch (err) {
            throw err;
        }
    }
}

export default UserService;
