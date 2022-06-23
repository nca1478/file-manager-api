const queryImagesList = (user, userId, limit, skip) => {
    return {
        where: { userId },
        order: [["filename", "ASC"]],
        attributes: { exclude: ["userId"] },
        distinct: true,
        include: [
            // User
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

export { queryImagesList };
