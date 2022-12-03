import { dayThreePartOne, dayThreePartTwo } from './day3';

describe('Day two tests', () => {
  test('Part one', () => {
    expect(dayThreePartOne()).toBe(8153);
  });

  test('Part two', () => {
    expect(dayThreePartTwo()).toBe(2342);
  });
});
