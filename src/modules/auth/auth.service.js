const prisma = require("../../config/prisma")

exports.createUser = async ({ email, name, password, recovery }) => {
    try {
        return await prisma.user.create({
            data: { email, name, password, recovery }
        })
    } catch (error) {
        throw new Error("Failed to create user")
    }
}

exports.getUserByEmail = async ({ email }) => {
    try {
        return await prisma.user.findUnique({
            where: { email }
        })
    } catch (error) {
        throw new Error("Failed to retrive user")
    }
}

exports.updateUser = async ({ email, data }) => {
    try {
        return await prisma.user.update({
            where: { email },
            data: { ...data }
        })
    } catch (error) {
        throw new Error("Failed to update user")
    }
}



