require("dotenv").config()
const express = require('express')
const cors = require('cors')
require('./src/config/prisma')
const authRoutes=require('./src/modules/auth/auth.route')


const server = express()

server.use(cors())
server.use(express.json())

server.use(authRoutes)


const PORT = 3001 || process.env.PORT

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})

server.get("/", (req, res) => {
    res.send(`<h1>Server running</h1>`)
})