const searchHistoryService = require('./searchHistory.service')
const { sendResponse } = require('../../common/response-handle')

exports.add = async (req, res) => {
    try {
        const { searchkey } = req.body
        const userId = req.payload

        if (!searchkey) {
            sendResponse(res, 400, false, "searchkey is required")
            return;
        }
        console.log({searchkey,userId});
        

        const newSearchkey = await searchHistoryService.addSearchHistory({ searchkey, userId })
        sendResponse(res, 200, true, "Search history added", newSearchkey)
    } catch (error) {
        sendResponse(res, 500, false, "Failed add search history", null, error)
    }
}

exports.getHistory = async (req, res) => {
    try {
        const userId = req.payload

        const history = await searchHistoryService.getSearchHistory(userId)
        sendResponse(res, 200, true, "Search history retrive successfully", history)
    } catch (error) {
        sendResponse(res, 500, false, "Failed to retrive Search History", null, error)
    }
}

exports.deleteHistory = async (req, res) => {
    try {
        const { id } = req.params

        const deletedHistory = await searchHistoryService.deleteSearchHistory(Number(id))
        if (!deletedHistory) {
            sendResponse(res, 404, false, "History not found")
            return;
        }
        sendResponse(res, 200, true, "History deleted successfully", deletedHistory)
    } catch (error) {
        sendResponse(res, 500, false, "Failed to delete History", null, error)
    }
}