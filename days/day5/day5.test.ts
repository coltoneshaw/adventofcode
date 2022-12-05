import { dayFivePartOne, dayFivePartTwo } from './day5';

describe('Day five tests', () => {
  test('Part one', () => {
    expect(dayFivePartOne()).toBe('TBVFVDZPN');
  });

  test('Part two', () => {
    expect(dayFivePartTwo()).toBe('VLCWHTDSZ');
  });
});
