import { Cell } from '../Cell';
import { WIN_VALUE } from '../config';

export function checkWinState(grid: Cell[][]) {
  return grid.some((row) => row.some((cell) => cell.value === WIN_VALUE));
}
