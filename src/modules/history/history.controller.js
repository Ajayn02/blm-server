const { sendResponse } = require('../../common/response-handle')
const historyService = require('./history.service')


exports.addToHistory = async (req, res) => {
    try {
        const { movieId } = req.body
        const userId = req.payload

        if (!movieId) {
            sendResponse(res, 400, false, "MovieID is required")
            return;
        }

        const newHistory = await historyService.addHistory({ movieId, userId })
        sendResponse(res, 200, true, "History added", newHistory)
    } catch (error) {
        sendResponse(res, 500, false, "Failed add History", null, error)
    }
}

exports.getHistory = async (req, res) => {
    try {
        const userId = req.payload

        const history = await historyService.getHistory(userId)
        sendResponse(res, 200, true, "History retrive successfully", history)
    } catch (error) {
        sendResponse(res, 500, false, "Failed to retrive History", null, error)
    }
}

exports.deleteHistory = async (req, res) => {
    try {
        const { id } = req.params

        const deletedHistory = await historyService.removeFromHistory(Number(id))
        if (!deletedHistory) {
            sendResponse(res, 404, false, "History not found")
            return;
        }
        sendResponse(res, 200, true, "History deleted successfully", deletedHistory)
    } catch (error) {
        sendResponse(res, 500, false, "Failed to delete History", null, error)
    }
}