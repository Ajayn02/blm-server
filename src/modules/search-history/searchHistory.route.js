const express = require("express")
const historyController = require('./searchHistory.controller')
const jwtMiddleware = require("../../common/jwt-middleware")

const router = express.Router()

router.route("/")
    .post(jwtMiddleware, historyController.add)
    .get(jwtMiddleware, historyController.getHistory)

router.route("/:id")
    .delete(jwtMiddleware, historyController.deleteHistory)

module.exports = router