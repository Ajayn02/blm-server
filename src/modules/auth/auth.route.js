const express = require("express")
const authController = require('./auth.controller')

const router = express.Router()

router.route("/")
    .post(authController.signup)

router.route("/signin")
    .post(authController.signin)

router.route("/forget")
    .post(authController.forgetPassword)

router.route("/reset")
    .post(authController.updateUser)

module.exports = router