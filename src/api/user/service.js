// Dependencies

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
}

export default UserService;
