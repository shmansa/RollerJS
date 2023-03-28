import { Roller } from './Roller';

describe("Smoke test", ()=> {
  test("The test scaffold runs successfully.", ()=> {
    expect(true).toBe(true);
  });
})

describe('Roller tests', () => {
  describe('constructor', () => {
    test('should default to 6 faces if an invalid value is provided', () => {
      const roller = new Roller(1);
      expect(roller['faces']).toBe(6);
    });

    test('should initialize distribution map with all faces having zero rolls', () => {
      const roller = new Roller(4);
      expect(roller['distribution'].size).toBe(4);
      expect(roller['distribution'].get(1)).toBe(0);
      expect(roller['distribution'].get(2)).toBe(0);
      expect(roller['distribution'].get(3)).toBe(0);
      expect(roller['distribution'].get(4)).toBe(0);
    });
  });

  describe('roll', () => {
    test('should not record roll if value is not valid for the number of faces and return 0', () => {
      const roller = new Roller(3);
      const result = roller.roll(4);
      expect(result).toBe(0);
      expect(roller.last()).toBe(0);
      expect(roller.distribution().get(4)).toBe(undefined);
    });

    test('should record roll, update last and distribution, and return the same value if it is between 1 and the number of faces (inclusive)', () => {
      const roller = new Roller(2);
      const result = roller.roll(2);
      expect(result).toBe(2);
      expect(roller.last()).toBe(2);
      expect(roller.distribution().get(2)).toBe(1);
    });
  });

  describe('last', () => {
    test('should return 0 if no rolls have been made yet', () => {
      const roller = new Roller(6);
      expect(roller.last()).toBe(0);
    });

    test('should return the value of the latest roll', () => {
      const roller = new Roller(6);
      roller.roll(3);
      roller.roll(6);
      roller.roll(1);
      expect(roller.last()).toBe(1);
    });
  });

  describe('distribution', () => {
    test('should return a map with all faces having zero rolls if no rolls have been made yet', () => {
      const roller = new Roller(4);
      const distribution = roller.distribution();
      expect(distribution.get(1)).toBe(0);
      expect(distribution.get(2)).toBe(0);
      expect(distribution.get(3)).toBe(0);
      expect(distribution.get(4)).toBe(0);
    });

    test('should return a map with the correct number of rolls for each face that has been rolled', () => {
      const roller = new Roller(6);
      roller.roll(2);
      roller.roll(4);
      roller.roll(1);
      roller.roll(4);
      const distribution = roller.distribution();
      expect(distribution.get(1)).toBe(1);
      expect(distribution.get(2)).toBe(1);
      expect(distribution.get(3)).toBe(0);
      expect(distribution.get(4)).toBe(2);
      expect(distribution.get(5)).toBe(0);
      expect(distribution.get(6)).toBe(0);
    });
  });
});
