import path from 'path';
import { syncReadFile } from '../helpers/file';

// same height blocks the tree
// outer edge are always visible.

// noop does nothing takes one cycle

// addx adds the number to x and takes two cycles
// first cycle does nothing
// second cycle adds the number to x

const checkTheseNumbers = [
  20,
  60,
  100,
  140,
  180,
  220,
];
const checkAndSave = (
  cycleTracker: number,
  endValue: number,
  cycleValues: number[],
) => {
  if (checkTheseNumbers.includes(cycleTracker)) {
    cycleValues.push(endValue * cycleTracker);
  }
};

/**

noop cycle
start of the cycle we begin execution nothing happens.
at the end of the cycle we add 1 to the execution count.

 */

const doNoop = (
  incrementCycle: () => void,
) => {
  incrementCycle();
};

const doAddx = (
  incrementCycle: () => void,
  addToEndValue: (value: number) => void,
  value: number,
) => {
  doNoop(incrementCycle);
  incrementCycle();
  addToEndValue(value);
};
const dayTenPartOne = () => {
  const cpuInstructions = syncReadFile(path.join(__dirname, 'input.txt'))
    .map((line) => line.split(' '))
    .map(([instruction, value]) => ({
      instruction,
      value: (value) ? +value : null,
    }));

  let endValue = 1;
  let cycleTracker = 0;
  const cycleValues: number[] = [];

  const incrementCycle = () => {
    cycleTracker += 1;
    checkAndSave(cycleTracker, endValue, cycleValues);
  };

  const addToEndValue = (value: number) => {
    endValue += value;
  };

  cpuInstructions.forEach(({ instruction, value }) => {
    if (instruction === 'noop') {
      doNoop(incrementCycle);
      return;
    }

    if (instruction === 'addx') {
      if (!value) {
        throw Error('Value is required for addx instruction');
      }

      doAddx(incrementCycle, addToEndValue, value);
    }
  });

  console.log({
    cycleValues,
    endValue,
  });

  return cycleValues.reduce((acc, value) => acc + value, 0);
};

// stop if you reach an edge
// stop if you reach a tree the same height or taller

export {
  dayTenPartOne,
};
