/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
import path from 'path';
import { syncReadFile } from '../helpers/file';

type MovementArray = ('.' | 'H' | 'T' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | undefined)[][];
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
    console.table(movementArray);
    throw Error('Unable to find the Head');
  }

  return {
    head: {
      row: movementArray.indexOf(headCurrentRow),
      col: headCurrentRow.indexOf('H'),
    },
  };
};

// checks if the head is in range for the tail and if it needs to move or not.
const checkElementInRange = (
  movementArray: MovementArray,
  currentPositions: [number, number],
  element: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'H' | 'T',
) => {
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

  return diagnalMembers.some((member) => member === element);
};

const findElementPosition = (
  movementArray: MovementArray,
  element: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'H' | 'T',
) => {
  const currentRow = movementArray.find((row) => row.includes(element));

  const position = (currentRow) ? {
    row: movementArray.indexOf(currentRow),
    col: currentRow.indexOf(element),
  } : undefined;

  return position;
};

const updateHeadPosition = (
  movementArray: MovementArray,
  { newPosition, oldPosition }: MoveObject,
  // tail :{ row: number, col: number } | undefined,
) => {
  // eslint-disable-next-line no-param-reassign
  if (newPosition.col < 0) {
    throw Error('Col cannot be less than 0');
  }

  movementArray[newPosition.row][newPosition.col] = 'H';
  const priorElement = findElementPosition(movementArray, '1');
  if (!priorElement) {
    movementArray[oldPosition.row][oldPosition.col] = '1';
    return;
  }
  movementArray[oldPosition.row][oldPosition.col] = '.';
};

type ElementObject = {
  element: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'T',
  priorElement: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'H',
  nextElement: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'T',
};
const updateElementPosition = (
  movementArray: MovementArray,
  direction: 'U' | 'D' | 'L' | 'R',
  // tailVisited: TailArray,
  {
    element,
    priorElement,
    nextElement,
  } : ElementObject,
) => {
  const position = findElementPosition(movementArray, element);
  const priorElementPosition = findElementPosition(movementArray, priorElement);

  console.log({
    element,
    priorElement,
    nextElement,
    position,
    priorElementPosition,
  });

  console.table(movementArray);

  if (!priorElementPosition) {
    console.log('prior element has not been placed yet');
    return;
  }

  // get current positions of everything
  // if the tail position is undefined, we don't need to do anything
  // check if the head is a diag member of the tail, if it is, we don't need to do anything

  if (!position) {
    console.log('Current element has not been placed yet');
    // movementArray[priorElementPosition.row][priorElementPosition.col] = element;
    return;
  }

  let newPosition = { ...position };

  // if the head and col are in different directions, they may be diag members
  const headInRange = checkElementInRange(movementArray, [position.row, position.col], element);

  if (headInRange) {
    console.log('Head is in range of tail, not moving');
    return;
  }

  if (direction === 'U') {
    newPosition = {
      row: priorElementPosition.row + 1,
      col: priorElementPosition.col,
    };
  }

  if (direction === 'D') {
    newPosition = {
      row: priorElementPosition.row - 1,
      col: priorElementPosition.col,
    };
  }

  if (direction === 'L') {
    newPosition = {
      row: priorElementPosition.row,
      col: priorElementPosition.col + 1,
    };
  }

  if (direction === 'R') {
    newPosition = {
      row: priorElementPosition.row,
      col: priorElementPosition.col - 1,
    };
  }

  movementArray[newPosition.row][newPosition.col] = element;
  // tailVisited[tailNewPosition.row][tailNewPosition.col] = '#';
  // tailVisited[tail.row][tail.col] = '#';
  // movementArray[priorElementPosition.row][priorElementPosition.col] = '.';

  // need to check the position of the next element and decide if it should be placed or not.

  // const nextElementPosition = findElementPosition(movementArray, nextElement);
  // console.log({
  //   nextElementPosition,
  // });

  // if (!nextElementPosition) {
  //   console.log('Next element has not been placed yet');
  //   movementArray[priorElementPosition.row][priorElementPosition.col] = nextElement;
  // }
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
const dayNinePartTwo = () => {
  const movements = syncReadFile(path.join(__dirname, 'input.txt'))
    .map((line) => line.split(' '))
    .map((
      [direction, number],
    ) => ({ direction, amount: +number } as { direction: 'U' | 'D' | 'L' | 'R', amount: number }));

  const movementArray: MovementArray = [['H']];
  const tailVisitedArray: TailArray = [['.']];

  movements.forEach(({ amount, direction }, index) => {
    console.log(`Iteration ${index} of ${movements.length} - ${direction} ${amount}`);

    /**
     * For each movement we need to update all nine positions in order
     * check if the prior element is within range and decide how to move
     */
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
      updateHeadPosition(movementArray, headPositions);
      for (let j = 1; j < 9; j += 1) {
        // console.table(movementArray);
        const element = (j === 8) ? 'T' : String(j) as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'T';
        const priorElement = (j === 1) ? 'H' : String(j - 1) as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'H';
        const nextElement = (j === 7) ? 'T' : String(j + 1) as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'T';
        updateElementPosition(
          movementArray,
          direction,
          {
            element,
            priorElement,
            nextElement,
          },
        );
      }
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

  return tailVisitedArray.flat().filter((item) => item === '#').length;
};

export {
  dayNinePartTwo,
};
