import { Cell, CellValue, createCell } from './Cell';
import { array, shuffle } from './array';

export class CellNotFoundError extends Error {}

export function spawnRandomCell(grid: Cell[][], value: CellValue) {
  const condition = (cell: Cell) => cell.value === 0;

  // Find a random row that matches the condition
  const randomRowIndex = shuffle(array(grid.length)).find((rowIndex) =>
    grid[rowIndex].some(condition)
  );

  if (randomRowIndex == null) {
    throw new CellNotFoundError('No empty cell found');
  }

  const row = grid[randomRowIndex];
  const randomColumnIndex = shuffle(array(row.length)).find((rowIndex) =>
    condition(row[rowIndex])
  );

  // we already know the row had a cell that matched the condition
  // so randomColumnIndex cannot be null
  grid[randomRowIndex][randomColumnIndex!] = createCell(value);
}
