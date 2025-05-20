const userService = require('./user.service')
const { sendResponse } = require('../../common/response-handle')

exports.getAll = async (req, res) => {
    try {
        const allUsers = await userService.getAllusers()
        if (!allUsers) {
            sendResponse(res, 404, false, "All users are not found")
            return;
        }
        sendResponse(res, 200, true, "users list fetched successfully ", allUsers)
    } catch (error) {
        sendResponse(res, 500, false, "users list fetching failed ", {}, error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await userService.deleteUser(parseInt(id))
        if (!deletedUser) {
            sendResponse(res, 404, false, " user are not found")
            return;
        }
        sendResponse(res, 200, true, "user deleted successfully ", deletedUser)
    } catch (error) {
        sendResponse(res, 500, false, "user deleting  failed ", {}, error)
    }
}