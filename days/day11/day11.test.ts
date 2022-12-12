/* eslint-disable max-len */
import { dayEleven } from './day11';

describe('Day Eleven tests', () => {
  test('Part one', () => {
    expect(dayEleven(false, 20)).toBe(10605);
  });

  test('Part two', () => {
    expect(dayEleven(true, 10000)).toBe(2713310158);
  });
});
