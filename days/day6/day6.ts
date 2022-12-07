import path from 'path';
import { syncReadFile } from '../helpers/file';

// first time marker appears after seven markers have been found.
const daySixPartOne = () => {
  const markers = syncReadFile(path.join(__dirname, 'input.txt'))[0].split('');
  for (let i = 0; i < markers.length; i += 1) {
    const subArray = markers.slice(i - 4, i);

    if (new Set(subArray).size === 4) {
      return i;
    }
  }
  return null;
};

const daySixPartTwo = () => {
  const markers = syncReadFile(path.join(__dirname, 'input.txt'))[0].split('');
  for (let i = 0; i < markers.length; i += 1) {
    const subArray = markers.slice(i - 14, i);

    if (new Set(subArray).size === 14) {
      return i;
    }
  }
  return null;
};

export {
  daySixPartOne,
  daySixPartTwo,
};
