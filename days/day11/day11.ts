/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import path from 'path';
import { syncReadFile } from '../helpers/file';

const gcd = (a: number, b: number): number => {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd(b, a % b);
};
const lcm = (a:number, b:number) => (a * b) / gcd(a, b);
const lcmArray = (array: number[]) => {
  // Least common multiple of a list of integers
  let n = 1;
  for (let i = 0; i < array.length; i += 1) { n = lcm(array[i], n); }
  return n;
};

// @ts-ignore
class Monkey {
  inventory: number[];

  inspectionCount: number;

  operation: Function;

  bored: {
    true: number;
    false: number;
  };

  divisibleBy: number;

  lcm: number;

  constructor(
    startingItems: number[],
    operation: string,
    divisibleBy: number,
    bored: {
      true: number;
      false: number;
    },
  ) {
    // const splitOperation = operation.split('=')[1].trim().split(' ');
    this.inventory = startingItems;
    // this.operation = new Function('old', `return BigInt${splitOperation[0]} ${splitOperation[1]} BigInt${splitOperation[2]}`);

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    this.operation = new Function('old', `return ${operation.split('=')[1]}`);

    this.bored = bored;
    this.divisibleBy = divisibleBy;
    this.inspectionCount = 0;
    this.lcm = 0;
  }

  receiveItem(item: number) {
    this.inventory.push(item);
  }

  increaseInspectionCount() {
    this.inspectionCount += 1;
  }

  setLcm(lcmSet: number) {
    this.lcm = lcmSet;
  }

  inspectItems(
    monkeys: Monkey[],
  ) {
    const rounds = this.inventory.length;
    for (let i = 0; i < rounds; i += 1) {
      let item = this.inventory.shift();

      item = (this.lcm)
        ? this.operation(item) % this.lcm
        : Math.floor(this.operation(item) / 3);
      if (!item) {
        return;
      }

      this.increaseInspectionCount();

      const testPasses = item % this.divisibleBy === 0;

      if (testPasses) {
        monkeys[this.bored.true].receiveItem(item);
      } else {
        monkeys[this.bored.false].receiveItem(item);
      }
    }
  }
}

const outputInventory = (monkeys: Monkey[]) => {
  monkeys.forEach((monkey, index) => {
    console.log(`Monkey ${index} inspected ${monkey.inspectionCount}`);
  });
};

const dayEleven = (
  useLcm = false,
  rounds = 10000,
) => {
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

  // const worryLevel = 0;

  const monkeyArray: Monkey[] = [];

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

  if (useLcm) {
    const lcmSet = lcmArray(monkeyArray.map((monkey) => monkey.divisibleBy));
    monkeyArray.forEach((monkey) => monkey.setLcm(lcmSet));
  }

  for (let i = 0; i < rounds; i += 1) {
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

  const activeMonkeys = monkeyArray
    .sort((a, b) => b.inspectionCount - a.inspectionCount)
    .map((monkey) => monkey.inspectionCount);

  // console.log(activeMonkeys.map((monkey) => monkey.inspectionCount));
  return activeMonkeys[0] * activeMonkeys[1];
};

// stop if you reach an edge
// stop if you reach a tree the same height or taller

export {
  dayEleven,
};
