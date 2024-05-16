const User = require('../../models/User');
const Pastries = require('../../models/Pastries');
const { numberOfPastriesWon, rollDice, determineWinningCombination } = require('../../utils/game.helper')

let winners = []

async function playGame(req, res) {
    const user = await User.findById(req.__user.id);
    
    // if (user.gamesPlayed >= 3) {
    //   return res.status(401).send('Maximum game plays reached');
    // }
    
    const dices = rollDice();
    const wonPastryCount = determineWinningCombination(dices);
  
    user.gamesPlayed++;
  
    let wonPastry = null;
    if (wonPastryCount > 0) {
      wonPastry = await Pastries.awardPastry(wonPastryCount, user);
      if (wonPastry) {
        winners.push({
          playerName: user.name,
          email: user.email,
          pastryName: wonPastry.name,
          date: new Date(),
        });
      }
    }
  
  
    const allPastriesWon = await Pastries.checkAllPastriesWon();
  
    if (allPastriesWon) {
      return res.json({ winners });
    } else {
      return res.json({ dices, wonPastry, user });
    }
}

async function getAllWinners(req, res) {
  try {
    const winners = await User.find({ won: true });
    return res.status(200).json(winners);
  } catch (err) {
    return res.status(404).send(error);
  }
}

module.exports = { playGame, getAllWinners };