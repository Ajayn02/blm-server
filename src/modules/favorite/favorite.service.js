const prisma = require('../../config/prisma')

exports.addFavorite = async ({ movieId, userId }) => {
    try {
        return await prisma.favorite.create({
            data: { movieId, userId }
        })
    } catch (error) {
        throw new Error("Failed to create favorite")
    }
}

exports.getFavorites = async (userId) => {
    try {
        return await prisma.favorite.findMany({
            where: { userId }
        })
    } catch (error) {
        throw new Error("Failed to retrive favorite")
    }
}

exports.removeFromFavorite = async (id) => {
    try {
        return await prisma.favorite.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error("Failed to delete favorite")
    }
}