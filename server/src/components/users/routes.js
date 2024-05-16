const express = require('express')

const userRouter = express.Router()
const controller = require('./controllers')
const authMiddleware = require('../../middlewares/auth.middleware')

userRouter.post('/signin', controller.signin)

userRouter.post('/signup', controller.signup)

userRouter.get('/', authMiddleware, controller.getAll)

userRouter.delete('/:id', authMiddleware, controller.remove)

userRouter.get('/pastries', controller.getAllPastries)

module.exports = userRouter
