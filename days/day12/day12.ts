/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import path from 'path';
import { syncReadFile } from '../helpers/file';

const dayTwelve = () => {
  const input = syncReadFile(path.join(__dirname, 'input.txt'));
  return input;
};

// stop if you reach an edge
// stop if you reach a tree the same height or taller

export {
  dayTwelve,
};
