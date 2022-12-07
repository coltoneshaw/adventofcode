import { daySeven } from './day7';

describe('Day Seven tests', () => {
  test('Part one', () => {
    expect(daySeven().partOne).toBe(1743217);
  });

  test('Part two', () => {
    expect(daySeven().partTwo).toBe(8319096);
  });
});
