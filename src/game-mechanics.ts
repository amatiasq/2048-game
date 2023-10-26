import { Cell, CellValue, createCell, emptyCell } from './Cell';
import { array, shuffle } from './util/array';

// Feel free to change the dimensions of the grid
export const COLUMNS = 6;
export const ROWS = COLUMNS;

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
  const condition = (cell: Cell) => cell.value === 0;

  // Find a random row that matches the condition
  const randomRowIndex = shuffle(array(ROWS)).find((rowIndex) =>
    grid[rowIndex].some(condition)
  );

  if (randomRowIndex == null) {
    throw new CellNotFoundError('No empty cell found');
  }

  const row = grid[randomRowIndex];
  const randomColumnIndex = shuffle(array(COLUMNS)).find((rowIndex) =>
    condition(row[rowIndex])
  );

  // we already know the row had a cell that matched the condition
  // so randomColumnIndex cannot be null
  grid[randomRowIndex][randomColumnIndex!] = createCell(value);
}
