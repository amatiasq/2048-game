import { describe, expect, test } from '@jest/globals';
import { Cell } from './Cell';
import { pushCells, pushCellsWithObstacles } from './pushCells';

const cell = (value: number) => ({ id: 0, value } as Cell);
const row = (...values: number[]) => values.map(cell);

// When the function has to generate new cells it will assign them an id
// that we don't know beforehand. We can't test for the exact id, but we
// can test that it is a number.
function anyId(cells: Cell[]) {
  return cells.map((cell) => ({ ...cell, id: expect.any(Number) }));
}

// sut = Subject Under Test
function pushTests(sut: typeof pushCells) {
  return () => {
    test('return value has the same length as the input', () => {
      const input = row(0, 0, 0, 0);
      const output = sut(input);
      expect(output.length).toBe(input.length);
    });

    test('moves non-zero items to the start of the array', () => {
      const input = row(0, 0, 0, 2);
      const expected = row(2, 0, 0, 0);
      expect(sut(input)).toEqual(expected);
    });

    test('sums adjacent cells with the same value', () => {
      const input = row(2, 2, 2, 0);
      const expected = row(4, 2, 0, 0);
      expect(sut(input)).toEqual(anyId(expected));
    });

    test('sums cells with the same value when separated only by zeros', () => {
      const input = row(2, 0, 0, 2);
      const expected = row(4, 0, 0, 0);
      expect(sut(input)).toEqual(anyId(expected));
    });
  };
}

describe('pushCells behaviour', pushTests(pushCells));

describe('pushCellsWithObstacles behaviour', () => {
  pushTests(pushCellsWithObstacles)();

  test('should not move obstacles', () => {
    const input = row(0, 0, -1, 0);
    const expected = row(0, 0, -1, 0);
    expect(pushCellsWithObstacles(input)).toEqual(anyId(expected));
  });

  test('should not merge obstacles', () => {
    const input = row(0, -1, -1, 0);
    const expected = row(0, -1, -1, 0);
    expect(pushCellsWithObstacles(input)).toEqual(anyId(expected));
  });

  test('should not move cells past obstacles', () => {
    const input = row(0, -1, 0, 2);
    const expected = row(0, -1, 2, 0);
    expect(pushCellsWithObstacles(input)).toEqual(anyId(expected));
  });

  test('should not merge cells past obstacles', () => {
    const input = row(0, -1, 2, 2);
    const expected = row(0, -1, 4, 0);
    expect(pushCellsWithObstacles(input)).toEqual(anyId(expected));
  });

  test('should not merge cells across obstacles', () => {
    const input = row(2, -1, 0, 2);
    const expected = row(2, -1, 2, 0);
    expect(pushCellsWithObstacles(input)).toEqual(anyId(expected));
  });

  test('the areas between obstacles should be independent', () => {
    const input = row(0, 2, -1, 2, 0, -1, 2, 2);
    const expected = row(2, 0, -1, 2, 0, -1, 4, 0);
    expect(pushCellsWithObstacles(input)).toEqual(anyId(expected));
  });
});
