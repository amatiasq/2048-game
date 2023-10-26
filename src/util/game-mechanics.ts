import { Cell, CellValue, createCell, emptyCell } from '../Cell';
import { array, shuffle } from './array';

export const COLUMNS = 6;
export const ROWS = 6;
export const INITIAL_CELL_VALUE: CellValue = 2;
export const SWIPE_CELL_VALUE: CellValue = 1;
const WIN_VALUE = 2048;

export class CellNotFoundError extends Error {}

export function checkWinState(grid: Cell[][]) {
  return grid.some((row) => row.some((cell) => cell.value === WIN_VALUE));
}

export function pushCells(list: Cell[]) {
  const result: Cell[] = [];
  const empty: Cell[] = [];

  for (const cell of list) {
    if (cell.value === 0) {
      empty.push(cell);
      continue;
    }

    const last = result[result.length - 1];

    if (last?.value === cell.value) {
      last.value *= 2;
    } else {
      result.push(cell);
    }
  }

  while (result.length < list.length) {
    result.push(empty.shift() ?? emptyCell());
  }

  return result;
}

export function spawnRandomCell(grid: Cell[][], value: CellValue) {
  const { row, column } = findRandomCell(grid, (cell) => cell.value === 0);
  grid[row][column] = createCell(value);
}

function findRandomCell(grid: Cell[][], condition: (cell: Cell) => boolean) {
  // Find a random row that matches the condition
  const randomRowIndex = shuffle(array(ROWS)).find((rowIndex) =>
    grid[rowIndex].some(condition)
  );

  if (randomRowIndex == null) {
    throw new CellNotFoundError('No row to satisfy condition was found');
  }

  const row = grid[randomRowIndex];
  const randomColumnIndex = shuffle(array(COLUMNS)).find((rowIndex) =>
    condition(row[rowIndex])
  );

  return {
    row: randomRowIndex,
    // we already know the row had a cell that matched the condition
    // so randomColumnIndex cannot be null
    column: randomColumnIndex!,
    cell: row[randomColumnIndex!],
  };
}
