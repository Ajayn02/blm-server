const jwt = require('jsonwebtoken')
const { sendResponse } = require("../common/response-handle")

const jwtMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            sendResponse(res, 400, false, "Token not found")
            return;
        }
        const user = jwt.verify(token, process.env.PRIVATE_KEY)
        req.payload = user.userId
        next()
    } catch (error) {
        console.log(err);
        sendResponse(res, 500, false, "Invalid token", null, error)
    }
}

module.exports = jwtMiddleware