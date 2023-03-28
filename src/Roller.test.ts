import { Roller } from './Roller';

describe('Roller', () => {
  test('should roll a number between 1 and 6', () => {
    const roller = new Roller(6);
    const result = roller.roll(3);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  test('should return the last roll', () => {
    const roller = new Roller(6);
    roller.roll(2);
    roller.roll(5);
    const result = roller.last();
    expect(result).toBe(5);
  });

  test('should return the distribution of rolls', () => {
    const roller = new Roller(6);
    roller.roll(2);
    roller.roll(5);
    roller.roll(2);
    const result = roller.distribution();
    expect(result.get(2)).toBe(2);
    expect(result.get(5)).toBe(1);
  });

  test('should throw an error if the number of faces is less than 1', () => {
    expect(() => new Roller(0)).toThrowError('Invalid number of faces. Must be greater than 0.');
  });

  test('should set the number of faces and reset the distribution and last roll', () => {
    const roller = new Roller(6);
    roller.roll(2);
    roller.roll(5);
    roller._faces = 8;
    const result = roller._faces;
    expect(result).toBe(8);
    expect(roller.distribution().size).toBe(8);
    expect(roller.last()).toBe(0);
  });
});
