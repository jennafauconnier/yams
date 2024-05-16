const User = require('../../models/User');
const Pastries = require('../../models/Pastries');

const winningCombinations = {
    "YAMS": { quantityWon: 3 },
    "CARRE": { quantityWon: 2 },
    "DOUBLE": { quantityWon: 1 }
};

async function play(req, res) {
    const user = await User.findById(req.__user.id);
    let quantity

    if (user.gamesPlayed >= 3) {
        return res.status(401).send('Maximum game plays reached');
    }

    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1;
    };

    let dices = [];
    for (let i = 0; i < 5; i++) {
        dices.push(rollDice());
    }

    let pastryWon = null;
    for (const [combination, { quantityWon }] of Object.entries(winningCombinations)) {
        if (isWinningCombination(dices, combination)) {
            pastryWon = combination;
            quantity = quantityWon
            await awardPastryToUser(user, combination);
            break;
        }
    }

    user.gamesPlayed++;
    await user.save();

    res.json({ dices, pastryWon, user , quantityWon: quantity });
}

async function awardPastryToUser(user, combination) {
    try {
        let quantity = 0;
        switch (combination) {
            case "YAMS":
                quantity = winningCombinations.YAMS.quantityWon;
                break;
            case "CARRE":
                quantity = winningCombinations.CARRE.quantityWon;
                break;
            case "DOUBLE":
                quantity = winningCombinations.DOUBLE.quantityWon;
                break;
            default:
                break;
        }
        for (let i = 0; i < quantity; i++) {
            const randomPastry = await getRandomPastries();
            if (randomPastry) {
                user.won = true;
                user.pastriesWon.push(randomPastry.name);
                await updatePastryStock(randomPastry.name, 1)
            }
        }
    } catch (error) {
        console.error("Error awarding pastries to user:", error);
    }
}

async function getRandomPastries() {
    try {
        const count = await Pastries.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomPastry = await Pastries.findOne().skip(randomIndex);
        return randomPastry;
    } catch (error) {
        console.error("Error getting random pastry:", error);
        return null;
    }
}

function isWinningCombination(diceResults, combination) {
    if (combination === "YAMS") {
        return new Set(diceResults).size === 1;
    } else if (combination === "CARRE") {
        const counts = {};
        diceResults.forEach(num => counts[num] = (counts[num] || 0) + 1);
        return Object.values(counts).includes(4);
    } else if (combination === "DOUBLE") {
        return new Set(diceResults).size === 3 && diceResults.some(num => diceResults.filter(n => n === num).length === 2);
    }
}

async function updatePastryStock(combination, quantityWon) {
    try {
        const pastry = await Pastries.findOne({ name: combination });
        if (pastry) {
            pastry.stock -= quantityWon;
            pastry.quantityWon += quantityWon;
            if (pastry.stock < 0) {
                pastry.stock = 0;
            }
            await pastry.save();
        }
    } catch (error) {
        console.error("Error updating pastry stock:", error);
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

module.exports = { play, getAllWinners };