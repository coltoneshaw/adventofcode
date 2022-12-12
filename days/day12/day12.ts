/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import path from 'path';
import { findItem } from '../helpers/array';
import { syncReadFile } from '../helpers/file';

// Highest point is Z, lowest point is a

// Goal: as few of steps as possible.

// during each step you can move exactly one square up/down/left/right
// elevation of the destination can be no more than 1 higher than the current square but it can be lower

// const updateVisited = (visited: Set<string>, x: number, y: number) => {
//   visited.add(`${x},${y}`);
// };

type Node = {
  x: number;
  y: number;
  key: string;
  weight: number
};

const characters = 'abcdefghijklmnopqrstuvwxyzE'.split('');

const checkNode = (
  priorNode: Node,
  inputArray: string[][],
  direction: 'up' | 'down' | 'left' | 'right',
) => {
  // console.log('Checking node, direction: ', node, direction);
  let searchX = priorNode.x;
  let searchY = priorNode.y;
  if (direction === 'up') {
    searchY -= 1;
  }

  if (direction === 'down') {
    searchY += 1;
  }

  if (direction === 'left') {
    searchX -= 1;
  }
  if (direction === 'right') {
    searchX += 1;
  }

  if (
    searchX < 0
    || searchY < 0
    || searchX >= inputArray[0].length
    || searchY >= inputArray.length
  ) {
    return {
      canMove: false,
      key: '',
    };
  }

  const searchedLocation = inputArray[searchY][searchX];
  const currentElement = inputArray[priorNode.y][priorNode.x];

  // if index of currentElement is - 1 of searchedLocation or lower

  const validMove = characters.indexOf(searchedLocation) - characters.indexOf(currentElement) <= 1;

  const node: Node = {
    x: searchX,
    y: searchY,
    key: `${searchX},${searchY}`,
    weight: priorNode.weight + 1,
  };
  return {
    canMove: validMove,
    node,
  };
};

const findPaths = (
  currentLocation: Node,
  inputArray: string[][],
) => {
  const possiblePaths: Node[] = [];

  // search up
  const up = checkNode(currentLocation, inputArray, 'up');
  if (up.canMove) possiblePaths.push(up.node as Node);

  // search down
  const down = checkNode(currentLocation, inputArray, 'down');
  if (down.canMove) possiblePaths.push(down.node as Node);

  // search left
  const left = checkNode(currentLocation, inputArray, 'left');
  if (left.canMove) possiblePaths.push(left.node as Node);

  // search right
  const right = checkNode(currentLocation, inputArray, 'right');
  if (right.canMove) possiblePaths.push(right.node as Node);

  return possiblePaths.sort((a, b) => a.weight - b.weight);
};

const dayTwelve = () => {
  const input = syncReadFile(path.join(__dirname, 'input.txt'))
    .map((line) => line.split(''));

  const traversed = new Set<string>();

  const current: Node = findItem(input, 'S');
  const queue: Node[] = [current];
  const endCoords: Node = findItem(input, 'E');

  while (queue.length > 0) {
    // need to start from the front because these should have the lowest weight
    const currentNode = queue.shift();

    if (!currentNode) {
      throw Error('Unable to find node');
    }

    if (currentNode.key === endCoords.key) {
      return currentNode.weight;
    }
    const paths = findPaths(currentNode, input);
    paths.forEach((n) => {
      if (!traversed.has(n.key)) {
        console.log('Adding node to queue: ', n);
        queue.push(n);
      }
    });

    traversed.add(currentNode.key);
  }

  return undefined;
};

export {
  dayTwelve,
};
