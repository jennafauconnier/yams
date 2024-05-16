const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gamesPlayed: {
    type: Number,
    default: 0
  },
  won: {
    type: Boolean,
    default: false
  },
  pastriesWon: [String] 
})

module.exports = mongoose.model('User', UserSchema)