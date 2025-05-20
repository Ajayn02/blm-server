require("dotenv").config()
const express = require('express')
const cors = require('cors')
require('./src/config/prisma')

const authRoutes = require('./src/modules/auth/auth.route')
const favoriteRoutes = require('./src/modules/favorite/favorite.route')
const historyRoutes = require('./src/modules/history/history.routes')
const watchRoutes = require('./src/modules/search-history/searchHistory.route')
const userRoutes = require('./src/modules/users/user.route')

const server = express()

server.use(cors())
server.use(express.json())

const apiRouter = express.Router();
server.use("/api", apiRouter);

apiRouter.use("/auth", authRoutes)
apiRouter.use("/favorites", favoriteRoutes)
apiRouter.use("/history", historyRoutes)
apiRouter.use("/search", watchRoutes)
apiRouter.use('/users', userRoutes)

const PORT = 3001 || process.env.PORT

server.listen(PORT, '0.0.0.0', () => {
    console.log(`server running at port ${PORT}`);
})

server.get("/", (req, res) => {
    res.send(`<h1>Server running</h1>`)
})