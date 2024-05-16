const express = require('express')

const gameRouterTest = express.Router()
const controller = require('./controller')
const authMiddleware = require('../../middlewares/auth.middleware')

gameRouterTest.post('/', authMiddleware, controller.play)

gameRouterTest.get('/winners', controller.getAllWinners)


module.exports = gameRouterTest
