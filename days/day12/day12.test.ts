/* eslint-disable max-len */
import { dayTwelve } from './day12';

describe('Day Eleven tests', () => {
  test('Part one', () => {
    expect(dayTwelve()).toBe(31);
  });

  test('Part two', () => {
    expect(dayTwelve()).toBe(2713310158);
  });
});
