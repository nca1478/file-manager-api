const queryImagesList = (user, userId, limit, skip) => {
    return {
        where: { userId },
        order: [["filename", "ASC"]],
        attributes: { exclude: ["userId"] },
        distinct: true,
        include: [
            {
                model: user,
                as: "user",
                required: false,
                attributes: ["id", "name"],
            },
        ],
        limit,
        offset: skip,
    };
};

const queryGetImageById = (user, id) => {
    return {
        where: { id },
        attributes: { exclude: ["userId"] },
        include: [
            {
                model: user,
                as: "user",
                required: false,
                attributes: ["id", "name"],
            },
        ],
    };
};

export { queryImagesList, queryGetImageById };
