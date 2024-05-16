require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const Pastries = require('../../models/Pastries');

const getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
      } catch (error) {
        res.status(500).send(error)
      }
}

const signup = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send()
  }

  const emailAvaibility = await User.findOne({ email })
  if (emailAvaibility) {
    return res.status(409).send('Email not available')
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)
  const salt = await bcrypt.genSalt(saltRounds)

  const hash = await bcrypt.hashSync(password, salt)
  
  const newUser = {
    email,
    password: hash,
  }


  try {
    const user = await User.create(newUser)
    const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3 hours' }
      )
  
      res.status(200).send({ tokenId: token, user })
  } catch (error) {
    return res.status(500).send(error)
  }
}

const signin = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await User.findOne({ email })
      
      if (!user) {
        return res.status(401).send()
      }
  
      const isSamePassword = await bcrypt.compareSync(password, user.password)
  
      if (!isSamePassword) {
        return res.status(401).send()
      }
  
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3 hours' }
      )
  
      res.status(200).send({ token, user })
    } catch (error) {
      res.status(401).send({})
    }
}

const remove = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send([])
    } catch (error) {
        res.status(500).send(error)
    }
}


const getAllPastries = async (req, res) => {
  try {
    const pastries = await Pastries.find();
    res.status(200).send(pastries);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  signup,
  signin,
  getAll,
  remove,
  getAllPastries,
}
