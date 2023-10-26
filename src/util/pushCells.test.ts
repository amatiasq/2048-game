import { describe, expect, test } from '@jest/globals';
import { Cell } from './Cell';
import { pushCells } from './pushCells';

const cell = (value: number) => ({ id: 0, value } as Cell);
const row = (...values: number[]) => values.map(cell);
const anyId = (cells: Cell[]) =>
  cells.map((cell) => ({ ...cell, id: expect.any(Number) }));

describe('pushCells behaviour', () => {
  test('return value has the same length as the input', () => {
    const input = row(0, 0, 0, 0);
    const output = pushCells(input);
    expect(output.length).toBe(input.length);
  });

  test('moves non-zero items to the start of the array', () => {
    const input = row(0, 0, 0, 2);
    const expected = row(2, 0, 0, 0);
    expect(pushCells(input)).toEqual(expected);
  });

  test('sums adjacent cells with the same value', () => {
    const input = row(2, 2, 2, 0);
    const expected = row(4, 2, 0, 0);
    expect(pushCells(input)).toEqual(anyId(expected));
  });

  test('sums cells with the same value when separated only by zeros', () => {
    const input = row(2, 0, 0, 2);
    const expected = row(4, 0, 0, 0);
    expect(pushCells(input)).toEqual(anyId(expected));
  });
});
