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

const win = 6;
const draw = 3;
const lose = 0;
const paper = 2;
const rock = 1;
const scissors = 3;

const dayTwoPartOne = () => {
  const scoreSheet = syncReadFile(path.join(__dirname, 'input.txt'));
  const roundScores: number[] = [];

  const endScoreKey = {
    // rock
    A: {
      Z: scissors + lose,
      Y: paper + win,
      X: rock + draw,
    },
    // Paper
    B: {
      Z: scissors + win,
      Y: paper + draw,
      X: rock + lose,
    },
    // Scissors
    C: {
      Z: scissors + draw,
      Y: paper + lose,
      X: rock + win,
    },
  };
  scoreSheet.forEach((score) => {
    const [opponent, me] = score.split(' ');
    roundScores.push(endScoreKey[opponent][me]);
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
      Z: paper + win,
      X: scissors + lose,
      Y: rock + draw,
    },
    // Paper
    B: {
      Z: scissors + win,
      X: rock + lose,
      Y: paper + draw,
    },
    // Scissors
    C: {
      Z: rock + win,
      X: paper + lose,
      Y: scissors + draw,
    },
  };

  scoreSheet.forEach((score) => {
    const [opponent, ending] = score.split(' ');

    roundScores.push(key[opponent][ending]);
  });

  const answer = roundScores.reduce((a, b) => a + b, 0);
  console.log(`The answer to Day Two Part one is: ${answer}`);

  return answer;
};

export {
  dayTwoPartOne,
  dayTwoPartTwo,
};
