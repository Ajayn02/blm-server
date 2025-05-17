const prisma = require('../../config/prisma')

exports.addHistory = async ({ movieId, userId }) => {
    try {
        return await prisma.history.create({
            data: { movieId, userId }
        })
    } catch (error) {
        throw new Error("Failed to create History")
    }
}

exports.getHistory = async (userId) => {    
    try {
        return await prisma.history.findMany({
            where: { userId }
        })
    } catch (error) {
        throw new Error("Failed to retrive History")
    }
}

exports.removeFromHistory = async (id) => {
    try {
        return await prisma.history.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error("Failed to delete History")
    }
}