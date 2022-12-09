import { dayOne } from './day1';

describe('Tests Day one', () => {
  test('Day one full test', () => {
    const { partOne, partTwo } = dayOne();
    expect(partOne).toBe(24000);
    expect(partTwo).toBe(45000);
  });
});
