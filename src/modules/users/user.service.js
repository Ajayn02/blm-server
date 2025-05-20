const prisma = require('../../config/prisma')


exports.getAllusers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteUser = async (id) => {
    try {
        return await prisma.user.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error(error)
    }
}