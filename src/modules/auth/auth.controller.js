const authService = require("./auth.service")
const { sendResponse } = require("../../common/response-handle")
const jsonwebtoken = require("jsonwebtoken")

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            sendResponse(res, 400, false, "Name, Email and Password are required")
            return;
        }

        const newUser = await authService.signupUser({ email, name, password })
        sendResponse(res, 201, true, "Signup successfull", { name: newUser.name, email: newUser.email })
    } catch (error) {
        console.log(error);
        sendResponse(res, 500, false, "Signup failed", null, error)
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        sendResponse(res, 400, false, "Email and Password are required")
        return;
    }
    const existing = await authService.signinUser({ email })
    
    if (!existing) {
        sendResponse(res, 404, false, "User not found")
        return
    }

    const token = jsonwebtoken.sign({ userId: existing.id }, process.env.PRIVATE_KEY)
    sendResponse(res, 200, true, "SignIn Success", { token })
}
