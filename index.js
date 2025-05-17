require("dotenv").config()
const express = require('express')
const cors = require('cors')
require('./src/config/prisma')

const authRoutes = require('./src/modules/auth/auth.route')
const favoriteRoutes = require('./src/modules/favorite/favorite.route')
const historyRoutes = require('./src/modules/history/history.routes')


const server = express()

server.use(cors())
server.use(express.json())

const apiRouter = express.Router();
server.use("/api", apiRouter);

apiRouter.use("/auth", authRoutes)
apiRouter.use("/favorites", favoriteRoutes)
apiRouter.use("/history", historyRoutes)

const PORT = 3001 || process.env.PORT

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})

server.get("/", (req, res) => {
    res.send(`<h1>Server running</h1>`)
})