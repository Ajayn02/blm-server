const prisma = require("../../config/prisma")

exports.signupUser = async ({ email, name, password }) => {
    try {
        return await prisma.user.create({
            data: { email, name, password }
        })
    } catch (error) {
        throw new Error("Failed to create user")
    }
}

exports.signinUser = async ({ email }) => {
    try {
        return await prisma.user.findUnique({
            where: { email }
        })
    } catch (error) {
        throw new Error("Failed to retrive user")
    }
}

exports.forgetPassword = async (req, res) => {

}

