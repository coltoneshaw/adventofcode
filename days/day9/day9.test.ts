import { dayNinePartOne, dayNinePartTwo } from './day9';

describe('Day Nine tests', () => {
  test('Part one', () => {
    expect(dayNinePartOne()).toBe(13);
  });

  test('Part two', () => {
    expect(dayNinePartTwo()).toBe(8);
  });
});
