const { sendResponse } = require('../../common/response-handle')
const favoriteService = require('./favorite.service')


exports.addToFavorite = async (req, res) => {
    try {
        const { movieId } = req.body

        if (!movieId) {
            sendResponse(res, 400, false, "MovieID is required")
            return;
        }
        const userId = req.payload

        const newFavorite = await favoriteService.addFavorite({ movieId, userId })
        sendResponse(res, 200, true, "Favorite added", newFavorite)
    } catch (error) {
        console.log(error);
        
        sendResponse(res, 500, false, "Failed add favorite", null, error)
    }
}

exports.getFavorite = async (req, res) => {
    try {
        const userId = req.payload

        const favorites = await favoriteService.getFavorites(userId)
        sendResponse(res, 200, true, "favorites retrive successfully", favorites)
    } catch (error) {
        sendResponse(res, 500, false, "Failed to retrive favorites", null, error)
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params

        const deletedFavorite = await favoriteService.removeFromFavorite(Number(id))
        if (!deletedFavorite) {
            sendResponse(res, 404, false, "Favorite not found")
            return;
        }
        sendResponse(res, 200, true, "Favorite deleted successfully", deletedFavorite)
    } catch (error) {
        sendResponse(res, 500, false, "Failed to delete favorites", null, error)
    }
}