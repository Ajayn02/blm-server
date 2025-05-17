const authService = require("./auth.service")
const { sendResponse } = require("../../common/response-handle")
const jsonwebtoken = require("jsonwebtoken")
const generateRecoveryCode = require('../../utils/recovery-code')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            sendResponse(res, 400, false, "Name, Email and Password are required")
            return;
        }
        const recovery = generateRecoveryCode()
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await authService.createUser({ email, name, password: hashedPassword, recovery })
        sendResponse(res, 201, true, "Signup successfull", { name: newUser.name, email: newUser.email, recovery: newUser.recovery })
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, "Signup failed", null, error)
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            sendResponse(res, 400, false, "Email and Password are required")
            return;
        }
        const existing = await authService.getUserByEmail({ email })

        if (!existing) {
            sendResponse(res, 404, false, "User not found")
            return
        }

        const isMatch = await bcrypt.compare(password, existing.password);
        if (!isMatch) {
            sendResponse(res, 401, false, "Incorrect password");
            return;
        }

        const token = jsonwebtoken.sign({ userId: existing.id }, process.env.PRIVATE_KEY)
        sendResponse(res, 200, true, "SignIn Success", { token })
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, "SignIn failed", null, error)
    }
}


exports.forgetPassword = async (req, res) => {
    try {
        const { email, code } = req.body

        if (!code || !email) {
            sendResponse(res, 400, false, "Recovery code and email are required")
            return;
        }

        const user = await authService.getUserByEmail({ email })

        if (!user || !user.recovery) {
            sendResponse(res, 404, false, "User not found")
            return;
        }

        if (user.recovery != code) {
            sendResponse(res, 404, false, "Invalid recovery code")
            return;
        }
        sendResponse(res, 200, true, "recovery code verified , please change the password")
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, "Failed to recover password ", null, error)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const recovery = generateRecoveryCode()
        const updatedUser = await authService.updateUser({ email, data: { recovery, password } })

        if (!updatedUser) {
            sendResponse(res, 404, false, "User not found")
            return;
        }

        sendResponse(res, 200, true, "user updated successfully", { email: updatedUser.email, recovery: updatedUser.recovery, name: updatedUser.name })
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, "Failed to update user ", null, error)
    }
}