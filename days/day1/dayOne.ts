import path from 'path';
import { syncReadFile } from '../helpers/file';

const splitArrayBySpaces = (arr: string[]) => {
  const splitArray: string[][] = [];
  let currentIndex = 0;
  arr.forEach((food) => {
    if (food === '') {
      currentIndex += 1;
      return;
    }

    const existingValues = splitArray[currentIndex];

    if (!existingValues) {
      splitArray[currentIndex] = [food];
      return;
    }
    splitArray[currentIndex] = [...existingValues, food];
  });

  return splitArray;
};

const sumArray = (arr: string[][]) => arr.map((foodItems) => {
  const sum = foodItems.reduce((acc, foodItem) => {
    const foodItemNumber = Number(foodItem);
    return acc + foodItemNumber;
  }, 0);

  return sum;
});

const sortArrayDesc = (arr: number[]) => arr.sort((a, b) => b - a);

const dayOne = () => {
  const calories = syncReadFile(path.join(__dirname, 'input.txt'));
  const splitArray = splitArrayBySpaces(calories);
  const combinedCalories = sumArray(splitArray);
  const sorted = sortArrayDesc(combinedCalories);

  console.log(`
    The answer to Day One Part One is: ${sorted[0]}
    The answer to Day One Part Two is: ${sorted[0] + sorted[1] + sorted[2]}
  `);

  return {
    partOne: sorted[0],
    partTwo: sorted[0] + sorted[1] + sorted[2],
  };
};

export {
  dayOne,
};
