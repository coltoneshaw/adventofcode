/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
import path from 'path';
import { syncReadFile } from '../helpers/file';

type MovementArray = ('.' | 'H' | 'T' | '$' | undefined)[][];
type TailArray = ('#' | '.')[][];

type MoveObject = {
  newPosition: {
    row: number;
    col: number;
  },
  oldPosition: {
    row: number;
    col: number;
  },
};
const adjustMoveArray = (
  movementArray: MovementArray | TailArray,
  moveObject: MoveObject,
  tailArray: TailArray,
): MoveObject => {
  const newMoveObject: MoveObject = { ...moveObject };

  // when moving left / right we should fill the whole array with '.' and then move the head

  // this is used for move left and up
  // check if the new row doesn't exist on the array
  // if the new row is -1 we need to add a new row at the beginning with unshift?
  // if the row is 1 we need to push a new row at the end
  // adjust the moveObject.new.row to 0

  // Moving up too many rows
  if (moveObject.newPosition.row === -1) {
    movementArray.unshift(
      Array(movementArray[0].length).fill('.'),
    );

    tailArray.unshift(
      Array(tailArray[0].length).fill('.'),
    );
    newMoveObject.newPosition.row = 0;
    newMoveObject.oldPosition.row = 1;
  }

  // moving down too many rows
  if (moveObject.newPosition.row === movementArray.length) {
    movementArray.push(
      Array(movementArray[0].length).fill('.'),
    );

    tailArray.push(
      Array(tailArray[0].length).fill('.'),
    );
  }

  // check the new column exists
  // if it is -1 unshift a new '.' to the beginning
  // if it's longer than the row length push a new '.' to the end
  // adjust the moveObject.new.col to movementArray[moveObject.new.row].length - 1

  // moving left too many columns
  if (moveObject.newPosition.col === -1) {
    movementArray.forEach((row) => {
      row.unshift('.');
    });

    tailArray.forEach((row) => {
      row.unshift('.');
    });

    newMoveObject.newPosition.col = 0;
    newMoveObject.oldPosition.col = 1;
  }

  // moving right too many columns
  if (moveObject.newPosition.col === movementArray[0].length) {
    movementArray.forEach((row) => {
      row.push('.');
    });

    tailArray.forEach((row) => {
      row.push('.');
    });
  }

  return newMoveObject;
};
const getCurrentPositions = (movementArray: MovementArray) => {
  const headCurrentRow = movementArray.find((row) => row.includes('H'));
  if (!headCurrentRow) {
    throw Error('Unable to find the Head');
  }
  const tailCurrentRow = movementArray.find((row) => row.includes('T'));

  const tailPosition = (tailCurrentRow) ? {
    row: movementArray.indexOf(tailCurrentRow),
    col: tailCurrentRow.indexOf('T'),
  } : undefined;

  return {
    head: {
      row: movementArray.indexOf(headCurrentRow),
      col: headCurrentRow.indexOf('H'),
    },
    tail: tailPosition,
  };
};

const updateHeadPosition = (
  movementArray: MovementArray,
  { newPosition, oldPosition }: MoveObject,
  tail :{ row: number, col: number } | undefined,
) => {
  // eslint-disable-next-line no-param-reassign
  if (newPosition.col < 0) {
    throw Error('Col cannot be less than 0');
  }

  movementArray[newPosition.row][newPosition.col] = 'H';
  if (!tail) {
    movementArray[oldPosition.row][oldPosition.col] = 'T';
    return;
  }
  movementArray[oldPosition.row][oldPosition.col] = '.';
};

// checks if the head is in range for the tail and if it needs to move or not.
const checkHeadInRange = (movementArray: MovementArray, currentPositions: [number, number]) => {
  const [row, col] = currentPositions;
  const [up, down, left, right] = [row - 1, row + 1, col - 1, col + 1];
  const diagnalPositions = [
    [up, left],
    [up, right],
    [down, left],
    [down, right],
    [row, left],
    [row, right],
    [up, col],
    [down, col],
  ];
  const diagnalMembers = diagnalPositions.filter((pos) => {
    const [r, c] = pos;
    if (movementArray[r] === undefined) return false;
    if (movementArray[r][c] === undefined) return false;
    return true;
  }).map((pos) => {
    const [r, c] = pos;
    return movementArray[r][c];
  });

  return diagnalMembers.some((member) => member === 'H');
};

const updateTailPosition = (
  movementArray: MovementArray,
  direction: 'U' | 'D' | 'L' | 'R',
) => {
  // need to expand out the visited array

  const { head, tail } = getCurrentPositions(movementArray);

  // get current positions of everything
  // if the tail position is undefined, we don't need to do anything
  // check if the head is a diag member of the tail, if it is, we don't need to do anything

  if (!tail) {
    console.log('Tail and head are in same location currently');
    return;
  }

  let tailNewPosition = { ...tail };

  // if the head and col are in different directions, they may be diag members
  const headInRange = checkHeadInRange(movementArray, [tail.row, tail.col]);

  if (headInRange) {
    console.log('Head is in range of tail, not moving');
    return;
  }

  if (direction === 'U') {
    tailNewPosition = {
      row: head.row + 1,
      col: head.col,
    };
  }

  if (direction === 'D') {
    tailNewPosition = {
      row: head.row - 1,
      col: head.col,
    };
  }

  if (direction === 'L') {
    tailNewPosition = {
      row: head.row,
      col: head.col + 1,
    };
  }

  if (direction === 'R') {
    tailNewPosition = {
      row: head.row,
      col: head.col - 1,
    };
  }

  movementArray[tailNewPosition.row][tailNewPosition.col] = 'T';
  movementArray[tail.row][tail.col] = '.';
};

const returnDirectionalPosition = (
  direction: 'U' | 'D' | 'L' | 'R',
  position: MoveObject['newPosition'],
) => {
  if (direction === 'U') {
    return { row: position.row - 1, col: position.col };
  }
  if (direction === 'D') {
    return { row: position.row + 1, col: position.col };
  }
  if (direction === 'L') {
    return { row: position.row, col: position.col - 1 };
  }
  if (direction === 'R') {
    return { row: position.row, col: position.col + 1 };
  }
  throw Error('Invalid direction');
};
// must stay behind the head in the direction the head is going, diagnal, or on top of
const dayNinePartOne = () => {
  const movements = syncReadFile(path.join(__dirname, 'input.txt'))
    .map((line) => line.split(' '))
    .map((
      [direction, number],
    ) => ({ direction, amount: +number } as { direction: 'U' | 'D' | 'L' | 'R', amount: number }));

  const movementArray: MovementArray = [['H']];
  const tailVisitedArray: TailArray = [['.']];

  movements.forEach(({ amount, direction }, index) => {
    for (let i = 0; i < amount; i += 1) {
      const current = getCurrentPositions(movementArray);
      const headPositions = adjustMoveArray(
        movementArray,
        {
          oldPosition: current.head,
          newPosition: returnDirectionalPosition(direction, current.head),
        },
        tailVisitedArray,
      );
      updateHeadPosition(movementArray, headPositions, current.tail);
      updateTailPosition(movementArray, direction);
    }

    if (movementArray.some((row) => row.includes(undefined))) {
      console.log({
        amount,
        direction,
        index,
      });
      throw Error('Array includes some undefined things');
    }
  });

  console.table(movementArray);
  console.table(tailVisitedArray);

  return tailVisitedArray.flat().filter((item) => item === '#').length;
};

const dayNinePartTwo = () => {

};

export {
  dayNinePartOne,
  dayNinePartTwo,
};
