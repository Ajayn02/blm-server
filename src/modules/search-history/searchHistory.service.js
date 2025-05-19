const prisma = require("../../config/prisma")

exports.addSearchHistory = async ({ searchkey, userId }) => {
    try {
        return await prisma.searchHistory.create({
            data: { searchkey, userId }
        })
    } catch (error) {
        throw new Error("Failed to add search history")
    }
}

exports.getSearchHistory = async (userId) => {
    try {
        return await prisma.searchHistory.findMany({
            where: { userId }
        })
    } catch (error) {
        throw new Error("Failed to fetch search history")
    }
}

exports.deleteSearchHistory = async (id) => {
    try {
        return await prisma.searchHistory.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error("Failed to delete search history")
    }
}
