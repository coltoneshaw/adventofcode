import path from 'path';
import { syncReadFile } from '../helpers/file';

// 1. read everything from the file
// 2. split it into sub arrays based on the spaces
// 3. sum the value in the sub array
// 4. find the highest value

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

const sortArray = (arr: number[]) => arr.sort((a, b) => b - a);

const dayOne = () => {
  const calories = syncReadFile(path.join(__dirname, 'input.txt'));
  const splitArray = splitArrayBySpaces(calories);
  const combinedCalories = sumArray(splitArray);
  const sorted = sortArray(combinedCalories);

  console.log(`
    The answer to day one is: ${sorted[0]}
  `);
};

dayOne();
