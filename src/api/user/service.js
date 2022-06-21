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
}

export default UserService;
