import path from 'path';
import { syncReadFile } from '../helpers/file';

// A / X - Rock
// B / Y - Paper
// C / Z - Scissors

// Rock 1
// Paper 2
// Scissors 3

// 0 Lose
// 3 Draw
// 6 Win

const dayTwoPartOne = () => {
  const scoreSheet = syncReadFile(path.join(__dirname, 'input.txt'));
  const roundScores: number[] = [];

  const opponentWinKey = {
    A: 'Z',
    B: 'X',
    C: 'Y',
  };

  const meWinKey = {
    X: 'C',
    Y: 'A',
    Z: 'B',
  };

  scoreSheet.forEach((score) => {
    let roundScore = 0;
    const [opponent, me] = score.split(' ');
    const oppWon = opponentWinKey[opponent] === me;
    const meWon = meWinKey[me] === opponent;

    if (meWon) roundScore += 6;
    if (me === 'X') roundScore += 1;
    if (me === 'Y') roundScore += 2;
    if (me === 'Z') roundScore += 3;
    if (!oppWon && !meWon) roundScore += 3;

    roundScores.push(roundScore);
  });

  const answer = roundScores.reduce((a, b) => a + b, 0);
  console.log(`The answer to Day Two Part one is: ${answer}`);
  return answer;
};

const dayTwoPartTwo = () => {
  const scoreSheet = syncReadFile(path.join(__dirname, 'input.txt'));
  const roundScores: number[] = [];

  // X means lose
  // Y means draw
  // Z means win

  const key = {
    // Rock
    A: {
      Z: 'paper',
      X: 'scissors',
      Y: 'rock',
    },
    // Paper
    B: {
      Z: 'scissors',
      X: 'rock',
      Y: 'paper',
    },
    // Scissors
    C: {
      Z: 'rock',
      X: 'paper',
      Y: 'scissors',
    },
  };

  scoreSheet.forEach((score) => {
    let roundScore = 0;
    const [opponent, ending] = score.split(' ');
    if (ending === 'Y') roundScore += 3;
    if (ending === 'Z') roundScore += 6;
    const myPlay = key[opponent][ending];
    if (myPlay === 'rock') roundScore += 1;
    if (myPlay === 'paper') roundScore += 2;
    if (myPlay === 'scissors') roundScore += 3;

    roundScores.push(roundScore);
  });

  const answer = roundScores.reduce((a, b) => a + b, 0);
  console.log(`The answer to Day Two Part one is: ${answer}`);

  return answer;
};

export {
  dayTwoPartOne,
  dayTwoPartTwo,
};
