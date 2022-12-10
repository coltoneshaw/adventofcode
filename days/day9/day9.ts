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
  movementArray: MovementArray,
  moveObject: MoveObject,
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
    newMoveObject.newPosition.row = 0;
  }

  // moving down too many rows
  if (moveObject.newPosition.row === movementArray.length) {
    movementArray.push(
      Array(movementArray[0].length).fill('.'),
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
    newMoveObject.newPosition.col = 0;
  }

  // moving right too many columns
  if (moveObject.newPosition.col === movementArray[0].length) {
    movementArray.forEach((row) => {
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
  const tailCurrentRow = movementArray.find((row) => row.includes('T'));

  return {
    head: {
      row: movementArray.indexOf(headCurrentRow),
      col: headCurrentRow.indexOf('H'),
    },
    tail: {
      row: (tailCurrentRow) ? movementArray.indexOf(tailCurrentRow) : undefined,
      col: (tailCurrentRow) ? tailCurrentRow.indexOf('T') : undefined,
    },
  };
};

const headUpDownCheck = (
  movementArray: MovementArray,
  direction: 'U' | 'D',
  amount: number,
): MovementArray => {
  console.log(`Adding ${amount} of rows ${direction}`);
  const headCheck = movementArray.find((row) => row.includes('H'));
  if (!headCheck) {
    throw Error('Unable to find the head');
  }

  const headCheckRow = movementArray.indexOf(headCheck);

  if (
    direction === 'U'
    && movementArray[headCheckRow - amount] === undefined) {
    const newRows: MovementArray = Array.from(
      { length: amount },
      () => Array.from(
        { length: movementArray[headCheckRow].length },
        () => '.',
      ),
    );
    return [
      ...newRows,
      ...movementArray,
    ];
  }

  if (
    direction === 'D' && movementArray[headCheckRow + amount] === undefined) {
    const newRows: MovementArray = Array.from(
      { length: amount },
      () => Array.from(
        { length: movementArray[headCheckRow].length },
        () => '.',
      ),
    );

    return [
      ...movementArray,
      ...newRows,
    ];
  }

  return movementArray;
};

const emptycheck = (movementArray: MovementArray) => movementArray.map((row) => row.map((r) => {
  if (r === undefined) return '.';
  return r;
}));

const updateHeadPosition = (
  movementArray: MovementArray,
  { newPosition, oldPosition }: MoveObject,
) => {
  // eslint-disable-next-line no-param-reassign
  if (newPosition.col < 0) {
    throw Error('Col cannot be less than 0');
  }

  movementArray[newPosition.row][newPosition.col] = 'H';
  movementArray[oldPosition.row][oldPosition.col] = '.';
};

const updateTailPosition = (
  movementArray: MovementArray,
  oldRow: number | undefined,
  oldCol: number | undefined,
  newRow: number,
  newCol: number,
  tailVisitedArray: TailArray,
) => {
  if (newCol < 0) {
    throw Error('Col cannot be less than 0');
  }
  movementArray[newRow][newCol] = 'T';
  if (tailVisitedArray[newRow] === undefined) {
    tailVisitedArray[newRow] = Array.from({ length: movementArray[newRow].length || 10 }, () => '.');
  }

  if (tailVisitedArray[newRow][newCol] === undefined) {
    tailVisitedArray[newRow][newCol] = '.';
  }

  tailVisitedArray[newRow][newCol] = '#';
  if (oldRow !== undefined && oldCol !== undefined) movementArray[oldRow][oldCol] = '.';
};

type MovementFunction = {
  amount: number;
  movementArray: MovementArray;
  tailVisitedArray: TailArray;
};

// Moving right is adjusting the column + 1
const moveRight = ({
  amount,
  movementArray,
  tailVisitedArray,
}: MovementFunction) => {
  for (let i = 0; i < amount; i += 1) {
    movementArray = emptycheck(movementArray);
    const current = getCurrentPositions(movementArray);
    const headPositions = adjustMoveArray(movementArray, {
      oldPosition: current.head,
      newPosition: {
        row: current.head.row,
        col: current.head.col + 1,
      },
    });

    updateHeadPosition(movementArray, headPositions);
    updateTailPosition(movementArray);

    // // check if the head and tail are on different rows right now and if it's the first move since the head has moved
    // // this means it's most likely a diagnal partner.
    // if (i === 0 && head.row !== tail.row) {
    //   continue;
    // }

    // // this checks to see if they are on top of each other.
    // if (head.row === tail.row && (head.col + 1) === tail.col) {
    //   continue;
    // }

    // // if the tail is undefined, it's assumed the head is on top of the tail
    // if (tail.col === undefined || tail.row === undefined) {
    //   updateTailPosition(movementArray, tail.row, tail.col, head.row, head.col, tailVisitedArray);
    //   continue;
    // }
    // updateTailPosition(movementArray, tail.row, tail.col, head.row, head.col, tailVisitedArray);
  }
};

// Moving right is adjusting the column - 1
const moveLeft = ({
  amount,
  movementArray,
  tailVisitedArray,
}: MovementFunction) => {
  for (let i = 0; i < amount; i += 1) {
    const { head, tail } = getCurrentPositions(movementArray);
    let newHeadCol = head.col - 1;
    if (newHeadCol < 0) {
      movementArray[head.row].unshift('.');
      newHeadCol = 0;
    }
    updateHeadPosition(movementArray, head.row, head.col, head.row, newHeadCol);

    // this checks to see if they are on top of each other.
    if (head.row === tail.row && (newHeadCol) === tail.col) {
      continue;
    }

    // check if the head and tail are on different rows right now and if it's the first move since the head has moved
    // this means it's most likely a diagnal partner.
    if (i === 0 && head.row !== tail.row) {
      continue;
    }
    // if the tail is undefined, it's assumed the head is on top of the tail
    if (tail.col === undefined || tail.row === undefined) {
      updateTailPosition(movementArray, tail.row, tail.col, head.row, head.col, tailVisitedArray);
      continue;
    }
    updateTailPosition(movementArray, tail.row, tail.col, head.row, head.col, tailVisitedArray);
  }
};

// Moving up is reducing the row index by 1
const moveUp = ({
  amount,
  movementArray,
  tailVisitedArray,
}: MovementFunction) => {
  for (let i = 0; i < amount; i += 1) {
    const { head, tail } = getCurrentPositions(movementArray);

    if (head.row - 1 >= movementArray.length) {
      movementArray.push(Array.from({
        length: movementArray.map((a) => a.length)
          .indexOf(Math.max(...movementArray.map((a) => a.length))),
      }, () => '.'));
    }

    if (head.col > movementArray[head.row - 1].length) {
      movementArray[head.row - 1].push('.');
    }

    updateHeadPosition(movementArray, head.row, head.col, head.row - 1, head.col);

    if ((head.row - 1) === tail.row && head.col === tail.col) {
      continue;
    }

    // if the tail is undefined, it's assumed the head is on top of the tail
    if (tail.col === undefined || tail.row === undefined) {
      updateTailPosition(movementArray, tail.col, tail.col, head.row, head.col, tailVisitedArray);
      continue;
    }

    if (i > 0) {
      // if it's the first move after we go up, we will go right where the head just left
      if (i === 1) {
        updateTailPosition(movementArray, tail.row, tail.col, head.row, head.col, tailVisitedArray);
        continue;
      }
      updateTailPosition(movementArray, tail.row, tail.col, tail.row - 1, tail.col, tailVisitedArray);
    }
  }
};

const moveDown = ({
  amount, movementArray, tailVisitedArray,
}: MovementFunction) => {
  for (let i = 0; i < amount; i += 1) {
    const { head, tail } = getCurrentPositions(movementArray);

    if (head.row + 1 >= movementArray.length) {
      movementArray.push(Array.from({
        length: movementArray.map((a) => a.length)
          .indexOf(Math.max(...movementArray.map((a) => a.length))),
      }, () => '.'));
    }

    if (head.col > movementArray[head.row + 1].length) {
      movementArray[head.row + 1].push('.');
    }

    updateHeadPosition(movementArray, head.row, head.col, head.row + 1, head.col);

    if ((head.row + 1) === tail.row && head.col === tail.col) {
      continue;
    }

    // if the tail is undefined, it's assumed the head is on top of the tail
    if (tail.col === undefined || tail.row === undefined) {
      updateTailPosition(movementArray, undefined, undefined, head.row, head.col, tailVisitedArray);
      continue;
    }

    // if it goes up there will be the first up is diagonal and you leave it.
    // the second up you go right behind the tail.
    // i === 0 - this will be diagonal
    if (i > 0) {
      // if it's the first move after we go up, we will go right where the head just left
      if (i === 1) {
        updateTailPosition(movementArray, tail.row, tail.col, head.row, head.col, tailVisitedArray);
        continue;
      }
      updateTailPosition(movementArray, tail.row, tail.col, tail.row + 1, tail.col, tailVisitedArray);
    }
  }
};

// must stay behind the head in the direction the head is going, diagnal, or on top of
const dayNinePartOne = () => {
  const movements = syncReadFile(path.join(__dirname, 'input.txt'))
    .map((line) => line.split(' '))
    .map(([direction, number]) => ({ direction, amount: +number }));

  let movementArray: MovementArray = [['H']];
  const tailVisitedArray: TailArray = [['.']];

  movements.forEach(({ amount, direction }, index) => {
    console.log({ amount, direction });
    console.table(movementArray);

    if (direction === 'R') moveRight({ amount, movementArray, tailVisitedArray });

    if (direction === 'L') moveLeft({ amount, movementArray, tailVisitedArray });

    if (direction === 'U') {
      movementArray = headUpDownCheck(movementArray, direction, amount);
      moveUp({ amount, movementArray, tailVisitedArray });
    }

    if (direction === 'D') {
      movementArray = headUpDownCheck(movementArray, direction, amount);
      moveDown({ amount, movementArray, tailVisitedArray });
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

  // console.log({
  //   movementArray,
  //   tailVisitedArray,
  // });

  return tailVisitedArray.flat().filter((item) => item === '#').length;
};

const dayNinePartTwo = () => {

};

export {
  dayNinePartOne,
  dayNinePartTwo,
};
