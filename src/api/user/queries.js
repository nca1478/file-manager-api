const queryUsersList = (limit, skip) => {
    return {
        where: { active: true },
        order: [["name", "ASC"]],
        attributes: { exclude: ["password"] },
        distinct: true,
        limit,
        offset: skip,
    };
};

const querySendEmailRecovery = (email) => {
    return {
        where: {
            email,
            active: true,
            google: false,
        },
    };
};

const queryRecoveryPassword = (email, token) => {
    return {
        where: { email, tokenRecovery: token, active: true },
    };
};

export { queryUsersList, querySendEmailRecovery, queryRecoveryPassword };