import { describe, expect, test } from '@jest/globals';
import { Cell } from './Cell';
import { CellNotFoundError, spawnRandomCell } from './spawnRandomCell';

const cell = (value: number) => ({ id: 0, value } as Cell);
const row = (...values: number[]) => values.map(cell);
const flatten = (grid: Cell[][]) =>
  grid.flatMap((row) => row.map((cell) => cell.value));

describe('spawnRandomCell function', () => {
  test('should spawn a cell with value 1 somewhere', () => {
    const grid = [row(0, 0), row(0, 0)];
    spawnRandomCell(grid, 1);
    expect(flatten(grid)).toContain(1);
  });

  test('should change only one cell', () => {
    const grid = [row(0, 0), row(0, 0)];
    spawnRandomCell(grid, 1);
    const ones = flatten(grid).filter((x) => x === 1);
    expect(ones.length).toBe(1);
  });

  test('should insert the valued passed', () => {
    const grid = [row(0, 0), row(0, 0)];
    spawnRandomCell(grid, 1024);
    expect(flatten(grid)).toContain(1024);
  });

  test('should insert at the only place available', () => {
    const grid = [row(1, 0), row(1, 1)];
    spawnRandomCell(grid, 1);
    expect(flatten(grid)).not.toContain(0);
  });

  test('should throw if no cell is available', () => {
    const grid = [row(1, 1), row(1, 1)];
    expect(() => spawnRandomCell(grid, 1)).toThrow(CellNotFoundError);
  });
});
