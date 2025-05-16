const express = require("express")
const authController = require('./auth.controller')

const router = express.Router()

router.route("/auth/signin")
    .post(authController.signin)

router.route("/auth")
    .post(authController.signup)



module.exports = router