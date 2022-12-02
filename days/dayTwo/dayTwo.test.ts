import { dayTwoPartOne, dayTwoPartTwo } from './dayTwo';

describe('Day two tests', () => {
  test('Part one', () => {
    expect(dayTwoPartOne()).toBe(11906);
  });

  test('Part two', () => {
    expect(dayTwoPartTwo()).toBe(11186);
  });
});
