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

export { queryUsersList };
