import path from 'path';
import { syncReadFile } from '../helpers/file';

type Directions = 'U' | 'D' | 'L' | 'R';

const movesDefinition = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: Directions) {
    const delta = movesDefinition[direction];
    this.x += delta.x;
    this.y += delta.y;
  }

  follow(point: Point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y),
    );
    if (distance > 1) {
      // Move this point
      const directionX = point.x - this.x;
      // 0 => do nothing
      // 1 or 2 => this.x++;
      // -1 or -2 => this.x--;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      const directionY = point.y - this.y;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

function markVisited(x: number, y: number, visited: Set<string>) {
  visited.add(`${x}-${y}`);
}

const dayNinePartTwo = () => {
  const movements = syncReadFile(path.join(__dirname, 'input.txt'))
    .map((line) => line.split(' '))
    .map((
      [direction, number],
    ) => ({ direction, amount: +number } as { direction: 'U' | 'D' | 'L' | 'R', amount: number }));

  const rope = new Array(10).fill(0).map(() => new Point(0, 0));
  const visited = new Set<string>();

  // marking the starting point as visited
  markVisited(0, 0, visited);

  movements.forEach((move) => {
    for (let i = 0; i < move.amount; i += 1) {
      rope[0].move(move.direction);
      for (let knot = 1; knot < rope.length; knot += 1) {
        const point = rope[knot];
        point.follow(rope[knot - 1]);
      }
      const tail = rope[rope.length - 1];
      markVisited(tail.x, tail.y, visited);
    }
  });

  return visited.size;
};

// function part2() {
//   const knots = new Array(10).fill(0).map((_) => new Point(0, 0));
//   const visited = new Set();
//   markVisited(0, 0, visited);

//   for (const line of lines) {
//     for (let i = 0; i < line.totalMoves; i++) {
//       // Move the head according to the instructions
//       knots[0].move(line.direction);
//       // Move the rest of the rope
//       for (let knot = 1; knot < knots.length; knot++) {
//         const point = knots[knot];
//         point.follow(knots[knot - 1]);
//       }
//       const tail = knots[knots.length - 1];
//       markVisited(tail.x, tail.y, visited);
//     }
//   }

//   console.log(visited.size);
// }
export {
  dayNinePartTwo,
};
