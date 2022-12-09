import path from 'path';
import { syncReadFile } from '../helpers/file';

// same height blocks the tree
// outer edge are always visible.

const dayEightPartOne = () => {
  const treeGrid = syncReadFile(path.join(__dirname, 'input.txt'));
  const treeGridArray = treeGrid.map((row) => row.split(''));
  let visibleTreeCount = 0;

  treeGridArray.forEach((row, rowIndex) => {
    // checks if it's on the top edge or bottom edge.
    if (rowIndex === 0 || rowIndex === treeGridArray.length - 1) {
      visibleTreeCount += row.length;
      return;
    }

    row.forEach((tree, treeIndex) => {
      if (treeIndex === 0 || treeIndex === row.length - 1) {
        visibleTreeCount += 1;
        return;
      }

      // check left and right

      const leftTrees = row.slice(0, treeIndex);
      const rightTrees = row.slice(treeIndex + 1);
      const topTrees = treeGridArray.map((r) => r[treeIndex]).slice(0, rowIndex);
      const bottomTrees = treeGridArray.map((r) => r[treeIndex]).slice(rowIndex + 1);
      if (leftTrees.every((lTree) => +lTree < +tree)) {
        visibleTreeCount += 1;
        return;
      }

      if (rightTrees.every((rTree) => +rTree < +tree)) {
        visibleTreeCount += 1;
        return;
      }

      if (topTrees.every((tTree) => +tTree < +tree)) {
        visibleTreeCount += 1;
        return;
      }

      if (bottomTrees.every((bTree) => +bTree < +tree)) {
        visibleTreeCount += 1;
      }
    });
  });

  return visibleTreeCount;
};

// stop if you reach an edge
// stop if you reach a tree the same height or taller

const returnScenicScore = (treeArray: string[], tree: number) => {
  const indexOfLarger = treeArray.findIndex((t) => +t >= +tree);

  if (indexOfLarger === -1) {
    return treeArray.length;
  }
  return treeArray.slice(0, indexOfLarger + 1).length;
};

const dayEightPartTwo = () => {
  const treeGrid = syncReadFile(path.join(__dirname, 'input.txt'));
  const treeGridArray = treeGrid.map((row) => row.split(''));
  const scenicScores: number[] = [];

  treeGridArray.forEach((row, rowIndex) => {
    row.forEach((tree, treeIndex) => {
      const leftTrees = row.slice(0, treeIndex).reverse();
      const leftTreeCount = returnScenicScore(leftTrees, +tree);

      const rightTrees = row.slice(treeIndex + 1);
      const rightTreeCount = returnScenicScore(rightTrees, +tree);

      const topTrees = treeGridArray.map((r) => r[treeIndex]).slice(0, rowIndex).reverse();
      const topTreeCount = returnScenicScore(topTrees, +tree);

      const bottomTrees = treeGridArray.map((r) => r[treeIndex]).slice(rowIndex + 1);
      const bottomTreeCount = returnScenicScore(bottomTrees, +tree);

      const scenicScore = leftTreeCount * rightTreeCount * topTreeCount * bottomTreeCount;
      scenicScores.push(scenicScore);
    });
  });

  return Math.max(...scenicScores);
};

export {
  dayEightPartTwo,
  dayEightPartOne,
};
