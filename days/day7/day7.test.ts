import { daySeven } from './day7';

describe('Day Seven tests', () => {
  test('Part one', () => {
    expect(daySeven().partOne).toBe(95437);
  });

  test('Part two', () => {
    expect(daySeven().partTwo).toBe(24933642);
  });
});
