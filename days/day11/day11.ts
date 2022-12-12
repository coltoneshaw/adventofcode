import path from 'path';
import { syncReadFile } from '../helpers/file';

const dayElevenPartOne = () => {
  const input = syncReadFile(path.join(__dirname, 'input.txt'));

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
