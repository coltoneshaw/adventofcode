import path from 'path';
import { syncReadFile } from '../helpers/file';

const alphaVal = (s: string) => s.toLowerCase().charCodeAt(0) - 97 + 1;

// identify what item in each sack exists in both sacks
const dayThreePartOne = () => {
  const rucksack = syncReadFile(path.join(__dirname, 'input.txt'));

  // split every line in half based on the length
  // identify what exists in both halves
  // for every item that exists in both halves, identify the priority
  // a - z = 1 - 26
  // A - Z = 27 - 52
  // return the sum of all priorities

  const priority = rucksack.map((sack) => {
    const half = sack.length / 2;
    const firstHalf = sack.slice(0, half).split('');
    const secondHalf = sack.slice(half).split('');

    for (let i = 0; i < firstHalf.length; i += 1) {
      if (secondHalf.includes(firstHalf[i])) {
        const value = alphaVal(firstHalf[i]);
        return (firstHalf[i] === firstHalf[i].toUpperCase()) ? value + 26 : value;
      }
    }
    return 1;
  });

  return priority.reduce((a, b) => a + b, 0);
};

const dayThreePartTwo = () => {
  const rucksack = syncReadFile(path.join(__dirname, 'input.txt'));

  // split every line in half based on the length
  // identify what exists in both halves
  // for every item that exists in both halves, identify the priority
  // a - z = 1 - 26
  // A - Z = 27 - 52
  // return the sum of all priorities

  const groups: string[][] = [];

  for (let i = 0; i < rucksack.length; i += 3) {
    const groupArray = [
      rucksack[i],
      rucksack[i + 1],
      rucksack[i + 2],
    ];

    groups.push(groupArray);
  }

  const priority = groups.map((group) => {
    for (let j = 0; j < group[0].length; j += 1) {
      if (
        group[1].includes(group[0][j])
        && group[2].includes(group[0][j])
      ) {
        console.log(group[0][j]);
        const value = alphaVal(group[0][j]);
        return group[0][j] === group[0][j].toUpperCase() ? value + 26 : value;
      }
    }
    return 1;
  });

  return priority.reduce((a, b) => a + b, 0);
};

dayThreePartTwo();

export {
  dayThreePartOne,
  dayThreePartTwo,
};
