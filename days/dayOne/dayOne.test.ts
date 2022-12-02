import { dayOne } from './dayOne';

describe('Tests Day one', () => {
  test('Day one full test', () => {
    const { partOne, partTwo } = dayOne();
    expect(partOne).toBe(69912);
    expect(partTwo).toBe(208180);
  });
});
