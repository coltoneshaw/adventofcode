/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import path from 'path';
import { syncReadFile } from '../helpers/file';

// @ts-ignore
class Monkey {
  inventory: number[];

  operation: Function;

  bored: {
    true: number;
    false: number;
  };

  divisibleBy: number;

  constructor(
    startingItems: number[],
    operation: string,
    divisibleBy: number,
    bored: {
      true: number;
      false: number;
    },
  ) {
    this.inventory = startingItems;
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    this.operation = new Function('old', `return ${operation.split('=')[1]}`);
    this.bored = bored;
    this.divisibleBy = divisibleBy;
  }

  receiveItem(item: number) {
    this.inventory.push(item);
  }

  inspectItems(
    monkeys: Monkey[],
  ) {
    const rounds = this.inventory.length;
    for (let i = 0; i < rounds; i += 1) {
      let item = this.inventory.shift();
      console.log('current item', item);

      item = Math.floor(this.operation(item) / 3);
      console.log('new Worry level', item);
      if (!item) {
        return;
      }

      const testPasses = item % this.divisibleBy === 0;
      console.log('The test function: ', testPasses, '');

      if (testPasses) {
        console.log(`sending ${item} to monkey ${this.bored.true}`);
        monkeys[this.bored.true].receiveItem(item);
      } else {
        console.log(`sending ${item} to monkey ${this.bored.false}`);
        monkeys[this.bored.false].receiveItem(item);
      }
    }
  }
}

const outputInventory = (monkeys: Monkey[]) => {
  monkeys.forEach((monkey, index) => {
    console.log(`Monkey ${index} has ${monkey.inventory}`);
  });
};

const dayElevenPartOne = () => {
  const input = syncReadFile(path.join(__dirname, 'input.txt'));

  const monkeyInstructions: string[][] = [[]];
  let monkeyNumber = 0;

  input.forEach((line) => {
    if (line === '') {
      monkeyNumber += 1;
      monkeyInstructions.push([]);
      return;
    }

    monkeyInstructions[monkeyNumber].push(line);
  });

  // need to check every item the monkey has, one at a time
  // after the monkey inspects the item worry level is divided by 3 and rounded down.

  const maxRounds = 1;
  // const worryLevel = 0;

  const monkeyArray: Monkey[] = [];

  // console.log(input);

  monkeyInstructions.forEach((mInstructions) => {
    const itemArray = mInstructions[1].split(':')[1].split(',').map((item) => +item.trim());
    const operationString = mInstructions[2].split(':')[1].trim();
    const divisibleBy = +mInstructions[3].split(':')[1].trim().split(' ')[2];
    const ifTrue = +mInstructions[4].split(':')[1].trim().split(' ')[3].trim();
    const ifFalse = +mInstructions[5].split(':')[1].trim().split(' ')[3].trim();

    monkeyArray.push(new Monkey(
      itemArray,
      operationString,
      divisibleBy,
      {
        true: ifTrue,
        false: ifFalse,
      },
    ));
  });

  for (let i = 0; i < maxRounds; i += 1) {
    monkeyArray.forEach((monkey) => {
      monkey.inspectItems(monkeyArray);
    });
  }

  outputInventory(monkeyArray);

  /**
   * On a turn
   * 1. inspects and throws all of the items it's holding, one at a time in the order listed
   * 2. Once it's done, it passes to the next monkey
   *
   * - If a monkey has no items, it passes to the next monkey
   *
   * A round:
   * when every monkey has had a turn
   *
   * - When item is thrown to another monkey, the item goes to the end of the monkeys list
   *
   */

  return input;
};

const dayElevenPartTwo = () => {
  const input = syncReadFile(path.join(__dirname, 'input.txt'));

  return input;
};

// stop if you reach an edge
// stop if you reach a tree the same height or taller

export {
  dayElevenPartOne,
  dayElevenPartTwo,
};
