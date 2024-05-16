const express = require('express')

const gameRouter = express.Router()
const controller = require('./controllers')
const authMiddleware = require('../../middlewares/auth.middleware')

gameRouter.post('/', authMiddleware, controller.playGame)

gameRouter.get('/winners', controller.getAllWinners)


module.exports = gameRouter
