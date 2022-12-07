import path from 'path';
import { syncReadFile } from '../helpers/file';

type File = {
  name: string;
  size: number;
  type: 'file';
  path: string;
};

type Directory = {
  name: string;
  type: 'directory',
  path: string;
  contains: (File | Directory)[];
};

const findDirectory = (directory: Directory, dPath: string): Directory | undefined => {
  if (directory.path === dPath) {
    return directory;
  }

  for (let i = 0; i < directory.contains.length; i += 1) {
    const item = directory.contains[i];
    if (item.type === 'directory') {
      const result = findDirectory(item, dPath);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};

const calculateFolderSize = (
  directory: Directory,
  dirData: { size: number, path: string }[] = [],
): number => {
  let folderSize = 0;

  directory.contains.forEach((item) => {
    if (item.type === 'file') {
      folderSize += +item.size;
      return;
    }

    if (item.type === 'directory') {
      const result = calculateFolderSize(item, dirData);
      dirData.push({
        size: result,
        path: item.path,
      });

      folderSize += result;
    }
  });

  return folderSize;
};

const daySeven = () => {
  const bashHistory = syncReadFile(path.join(__dirname, 'input.txt'));

  const fileSystem: Directory = {
    name: '/',
    type: 'directory',
    path: '/',
    contains: [],
  };

  let currentFolder = fileSystem;

  bashHistory.forEach((line) => {
    if (line.startsWith('$ cd')) {
      const directory = line.split(' ')[2];
      // can move up one with ".."
      // can move to root with "/"
      // can move to a directory with the name of the directory

      if (directory === '/') {
        // move to root
        currentFolder = fileSystem;
        return;
      }

      if (directory === '..') {
        const parentPath = currentFolder.path.split('/').slice(0, -1).join('/');
        if (parentPath === '') {
          currentFolder = fileSystem;
          return;
        }
        // move up one
        const parent = findDirectory(fileSystem, parentPath);
        if (parent) {
          currentFolder = parent;
          return;
        }
        throw Error('Unable to find parent');
      }

      // move to a directory
      // check if the `contains` already has that path
      // if not, push it into the contains

      const pathExists = currentFolder.contains
        .find((item) => `${currentFolder.path}/${directory}` === item.path);

      if (pathExists) {
        if (pathExists.type === 'file') {
          throw Error('Cannot move into a file');
        }
        currentFolder = pathExists;
        return;
      }

      const newDirectory: Directory = {
        name: directory,
        type: 'directory',
        path: (currentFolder.path === '/')
          ? `${currentFolder.path}${directory}`
          : `${currentFolder.path}/${directory}`,
        contains: [],
      };

      currentFolder.contains.push(newDirectory);
      currentFolder = newDirectory;
      return;
    }

    // parsing the output for a number, just to check if something else ends up in the file.
    if (Number.isInteger(+line.split(' ')[0])) {
      const file = line.split(' ')[1];
      const size = +line.split(' ')[0];

      const proposedPath = (currentFolder.path === '/')
        ? `${currentFolder.path}${file}`
        : `${currentFolder.path}/${file}`;

      if (currentFolder.contains.find((item) => item.path === proposedPath)) {
        return;
      }

      const newFile: File = {
        name: file,
        size,
        type: 'file',
        path: proposedPath,
      };

      currentFolder.contains.push(newFile);
    }
  });
  const dirData: { size: number, path: string }[] = [];
  const size = calculateFolderSize(fileSystem, dirData);
  const freeSpace = 70000000 - size;
  const spaceNeeded = 30000000 - freeSpace;

  return {
    partOne: dirData
      .filter((dir) => dir.size <= 100000)
      .map((dir) => dir.size).reduce((a, b) => a + b, 0),
    partTwo: dirData
      .map((dir) => dir.size)
      .sort((a, b) => Math.abs(spaceNeeded - a) - Math.abs(spaceNeeded - b))
      .find((dir) => dir >= spaceNeeded),
  };
};

export {
  daySeven,
};
