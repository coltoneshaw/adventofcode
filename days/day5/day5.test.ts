import { dayFivePartOne, dayFivePartTwo } from './day5';

describe('Day five tests', () => {
  test('Part one', () => {
    expect(dayFivePartOne()).toBe('CMZ');
  });

  test('Part two', () => {
    expect(dayFivePartTwo()).toBe('MCD');
  });
});
