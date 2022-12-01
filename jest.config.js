/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest');

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['./src/tests/jest.setup.ts'],
  collectCoverage: true,
  // extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>/days'],
  modulePaths: ['<rootDir>/days'],
  moduleDirectories: ['node_modules', 'days'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json',
  //   },
  // },
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
};
