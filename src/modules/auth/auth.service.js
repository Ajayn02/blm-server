const prisma = require("../../config/prisma")

exports.createUser = async ({ username, name, password, recovery }) => {
    try {
        return await prisma.user.create({
            data: { username, name, password, recovery }
        })
    } catch (error) {
        console.log(error);

        throw new Error("Failed to create user")
    }
}

exports.getUserByUsername = async (username) => {

    try {
        return await prisma.user.findUnique({
            where: { username }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateUser = async ({ username, data }) => {
    try {
        return await prisma.user.update({
            where: { username },
            data: { ...data }
        })
    } catch (error) {
        throw new Error("Failed to update user")
    }
}



