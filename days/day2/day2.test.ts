import { dayTwoPartOne, dayTwoPartTwo } from './day2';

describe('Day two tests', () => {
  test('Part one', () => {
    expect(dayTwoPartOne()).toBe(15);
  });

  test('Part two', () => {
    expect(dayTwoPartTwo()).toBe(12);
  });
});
