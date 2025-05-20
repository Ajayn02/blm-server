const express = require("express")
const userController = require('./user.controller')

const router = express.Router()

router.route("/")
    .get(userController.getAll)

router.route("/:id")
    .delete(userController.deleteUser)    

module.exports = router