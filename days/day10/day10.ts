import path from 'path';
import { syncReadFile } from '../helpers/file';

// same height blocks the tree
// outer edge are always visible.

const dayEightPartOne = () => {
  const treeGrid = syncReadFile(path.join(__dirname, 'input.txt'));
};

// stop if you reach an edge
// stop if you reach a tree the same height or taller

export {
  dayEightPartOne,
};
