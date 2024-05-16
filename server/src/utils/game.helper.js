function rollDice() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
}


function numberOfPastriesWon(dices) {
    if (fivePairs(dices)) {
        return 3; // YAM'S: 5 identical dice
    } else if (fourPairs(dices)) {
        if (Math.random() < 0.5) {
            return 2; // CARRÉ: 4 identical dice
        } else {
            return 3; // YAM'S: 5 identical dice
        }
    } else if (twoPairs(dices)) {
        if (Math.random() < 0.3) {
            return 2; // CARRÉ: 4 identical dice
        } else {
            return 3; // YAM'S: 5 identical dice
        }
    } else {
        return 0; // No winning combination
    }
  }

function twoPairs(dices) {
  const occurrences = {};
  for (const dice of dices) {
      occurrences[dice] = (occurrences[dice] || 0) + 1;
  }

  let pairCount = 0;
  for (const value of Object.values(occurrences)) {
      if (value === 2 || value === 3) {
          pairCount++;
      }
  }

  return pairCount === 2;
}

function fourPairs(dices) {
  const identicalCount = dices.filter(dice => dice === dices[0]).length;
  return identicalCount === 4;
}

function fivePairs(dices) {
  const allEqual = dices.every((dice, index) => dice === dices[0]);
  return allEqual;
}
  

function determineWinningCombination(dices) {
    const roll = dices;
    const rollCounts = {};
  
    roll.forEach(die => {
      rollCounts[die] = (rollCounts[die] || 0) + 1;
    });
  
    const counts = Object.values(rollCounts);
    const uniqueCounts = new Set(counts);
  
    if (uniqueCounts.size === 1) {
      // YAM'S
      return 3;
    } else if (uniqueCounts.size === 2) {
      // CARRÉ ou DOUBLE
      if (counts.includes(4)) {
        return 2; // CARRÉ
      } else if (counts.includes(2)) {
        return 1; // DOUBLE
      }
    }
  
    // Ajuster les probabilités ici pour augmenter les chances de gagner
    const randomNumber = Math.random(); // Génère un nombre aléatoire entre 0 et 1
    if (randomNumber < 0.2) {
      return 3; // YAM'S avec une probabilité de 20%
    } else if (randomNumber < 0.5) {
      return 2; // CARRÉ avec une probabilité de 30% (50% - 20%)
    } else if (randomNumber < 0.8) {
      return 1; // DOUBLE avec une probabilité de 30% (80% - 50%)
    } else {
      return 0; // Pas de combinaison gagnante avec une probabilité de 20% (100% - 80%)
    }
  }
  
module.exports = { rollDice, numberOfPastriesWon, determineWinningCombination };
