import path from 'path';
import { syncReadFile } from '../helpers/file';

const dayFivePartOne = () => {
  const supply = syncReadFile(path.join(__dirname, 'input.txt'));

  const cleanedInventory: string[][] = [];
  supply.splice(0, supply.indexOf('') - 1).forEach((item) => {
    const splitItems = item.split(' ').map((i) => i.trim().replace(/[[\]']+/g, ''));
    const cleanedArray: string[] = [];
    let priorIsSpace = false;
    splitItems.forEach((split) => {
      if (split === '') {
        priorIsSpace = true;
      }

      if (split !== '' && priorIsSpace) {
        priorIsSpace = false;
        cleanedArray.push('');
      }

      if (split !== '') {
        cleanedArray.push(split);
      }
    });

    cleanedInventory.push(cleanedArray);
  });

  const reversedInventory = cleanedInventory.reverse();

  const boxesStacks = supply
    .splice(0, supply.indexOf(''))[0].split('')
    .filter((item) => item !== ' ')
    .map((item) => +item);

  const unfilledInventory: string[][] = boxesStacks
    .map(() => Array(boxesStacks.length - 1).fill(''))
    .map((boxStack, boxPosition) => boxStack.map((_, itemPosition) => {
      const inventoryRow = reversedInventory[itemPosition];
      if (inventoryRow && inventoryRow.length >= boxPosition) {
        const item = inventoryRow[boxPosition];
        return (item && item !== '') ? item : '';
      }
      return '';
    }))
    .map((row) => row.filter((item) => item !== ''));

  // parse instructions

  const instructions = supply.splice(1, supply.length).map((item) => item.split(' ').map((i) => i.trim()));

  const movedInventory = [...unfilledInventory];
  // loop through instructions

  instructions.forEach((instruction) => {
    const [, amount, , from, , to] = instruction;

    for (let i = 0; i < +amount; i += 1) {
      const fromStack = movedInventory[+from - 1];
      const toStack = movedInventory[+to - 1];
      const item = fromStack.pop();
      toStack.push(item || '');
    }
  });

  return movedInventory.map((row) => row[row.length - 1]).join('');
};

const dayFivePartTwo = () => {
  const supply = syncReadFile(path.join(__dirname, 'input.txt'));

  const cleanedInventory: string[][] = [];
  supply.splice(0, supply.indexOf('') - 1).forEach((item) => {
    const splitItems = item.split(' ').map((i) => i.trim().replace(/[[\]']+/g, ''));
    const cleanedArray: string[] = [];
    let priorIsSpace = false;
    splitItems.forEach((split) => {
      if (split === '') {
        priorIsSpace = true;
      }

      if (split !== '' && priorIsSpace) {
        priorIsSpace = false;
        cleanedArray.push('');
      }

      if (split !== '') {
        cleanedArray.push(split);
      }
    });

    cleanedInventory.push(cleanedArray);
  });

  const reversedInventory = cleanedInventory.reverse();

  const boxesStacks = supply
    .splice(0, supply.indexOf(''))[0].split('')
    .filter((item) => item !== ' ')
    .map((item) => +item);

  const unfilledInventory: string[][] = boxesStacks
    .map(() => Array(boxesStacks.length - 1).fill(''))
    .map((boxStack, boxPosition) => boxStack.map((_, itemPosition) => {
      const inventoryRow = reversedInventory[itemPosition];
      if (inventoryRow && inventoryRow.length >= boxPosition) {
        const item = inventoryRow[boxPosition];
        return (item && item !== '') ? item : '';
      }
      return '';
    }))
    .map((row) => row.filter((item) => item !== ''));

  // parse instructions

  const instructions = supply.splice(1, supply.length).map((item) => item.split(' ').map((i) => i.trim()));

  const movedInventory = [...unfilledInventory];
  // loop through instructions

  instructions.forEach((instruction) => {
    const [, amount, , from, , to] = instruction;

    const fromStack = movedInventory[+from - 1];
    const toStack = movedInventory[+to - 1];

    const grabbedItems = fromStack.splice(fromStack.length - +amount, +amount);
    toStack.push(...grabbedItems);
  });

  return movedInventory.map((row) => row[row.length - 1]).join('');
};

export {
  dayFivePartOne,
  dayFivePartTwo,
};
