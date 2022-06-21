// Dependencies
import bcrypt from "bcryptjs";

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
}

export default UserService;
