const express = require("express")
const favoriteController = require('./favorite.controller')
const jwtMiddleware = require("../../common/jwt-middleware")

const router = express.Router()

router.route("/")
    .post(jwtMiddleware, favoriteController.addToFavorite)
    .get(jwtMiddleware, favoriteController.getFavorite)

router.route("/:id")
    .delete(jwtMiddleware, favoriteController.deleteFavorite)

module.exports = router