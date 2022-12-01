import { readFileSync } from 'fs';

function syncReadFile(filename: string) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

export {
  syncReadFile,
};
