const mongoose = require('mongoose');

const PastriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  quantityWon: {
    type: Number,
    default: 0,
  }
});

PastriesSchema.statics.awardPastry = async function(count, user) {
  const pastry = await this.getRandomPastry();
  if (pastry) {
      user.pastriesWon = user.pastriesWon || [];
      user.pastriesWon.push(pastry.name); 

      if (pastry.stock >= count) {
          pastry.stock -= count;
          pastry.quantityWon += count;
          await pastry.save();
          user.won = true
          user.save();
          return pastry;
      } else {
          user.pastriesWon.pop();
          await user.save(); 
          return null;
      }
  } else {
      return null;
  }
};

PastriesSchema.statics.getRandomPastry = async function() {
  const pastries = await this.find();
  const randomIndex = Math.floor(Math.random() * pastries.length);
  return pastries[randomIndex];
};
  
PastriesSchema.statics.checkAllPastriesWon = async function() {
  const pastries = await this.find();
  for (const pastry of pastries) {
    if (pastry.stock > 0) {
      return false;
    }
  }
  return true;
};


module.exports = mongoose.model('Pastries', PastriesSchema);