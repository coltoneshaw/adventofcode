import { daySixPartOne, daySixPartTwo } from './day6';

describe('Day five tests', () => {
  test('Part one', () => {
    expect(daySixPartOne()).toBe(1816);
  });

  test('Part two', () => {
    expect(daySixPartTwo()).toBe(2625);
  });
});
