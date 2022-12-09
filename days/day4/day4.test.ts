import { dayFourPartOne, dayFourPartTwo } from './day4';

describe('Day four tests', () => {
  test('Part one', () => {
    expect(dayFourPartOne()).toBe(2);
  });

  test('Part two', () => {
    expect(dayFourPartTwo()).toBe(4);
  });
});
