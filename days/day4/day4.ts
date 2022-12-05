import path from 'path';
import { syncReadFile } from '../helpers/file';

const dayFourPartOne = () => {
  const cleaningPairs = syncReadFile(path.join(__dirname, 'input.txt'));

  let duplicatePairs = 0;

  // loop through each pair
  // generate an array with the cleaning items
  // loop through the first array and see if it contains the whole second array
  // if so, increment the counter

  cleaningPairs.forEach((pair) => {
    const [first, second] = pair
      .split(',')
      .map((item) => item.trim())
      .map((item) => item.split('-'));

    if (
      Number(first[0]) <= Number(second[0])
      && Number(first[1]) >= Number(second[1])
    ) {
      duplicatePairs += 1;
      return;
    }

    if (
      Number(second[0]) <= Number(first[0])
      && Number(second[1]) >= Number(first[1])
    ) {
      duplicatePairs += 1;
    }
  });

  return duplicatePairs;
};

const dayFourPartTwo = () => {
  const cleaningPairs = syncReadFile(path.join(__dirname, 'input.txt'));

  let duplicatePairs = 0;

  // loop through each pair
  // generate an array with the cleaning items
  // loop through the first array and see if it contains the whole second array
  // if so, increment the counter

  cleaningPairs.forEach((pair) => {
    const [first, second] = pair
      .split(',')
      .map((item) => item.trim())
      .map((item) => item.split('-'));

    // contains the other.
    if (
      (
        Number(first[0]) <= Number(second[0])
        && Number(first[1]) >= Number(second[1])
      )
        || (
          Number(second[0]) <= Number(first[0])
        && Number(second[1]) >= Number(first[1])
        )
    ) {
      duplicatePairs += 1;
      return;
    }

    if (
      +first[0] <= +second[0]
      && +first[1] >= +second[0]
    ) {
      duplicatePairs += 1;
      return;
    }

    if (
      +first[1] >= +second[1]
      && +first[0] <= +second[0]
    ) {
      duplicatePairs += 1;
      return;
    }

    if (+first[0] <= +second[1] && +first[1] >= +second[1]) {
      duplicatePairs += 1;
      return;
    }

    console.log({ first, second });
  });

  return duplicatePairs;
};

export {
  dayFourPartOne,
  dayFourPartTwo,
};
