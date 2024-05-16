const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const userRouter = require('./components/users/routes')
const gameRouter = require('./components/game/routes')

const connectDB = require('./config/db')
const gameRouterTest = require('./components/gameTest/route')

const app = express()
const PORT = process.env.API_PORT || 8000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/images', express.static('../pastries/images'));



app.get('/', (req, res) => {
  res.send('Hello Jenna!')
})

app.use('/users', userRouter)
app.use("/game", gameRouter)
app.use("/gametest", gameRouterTest)

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`)
})
