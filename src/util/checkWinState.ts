import { WIN_VALUE } from '../config';
import { Cell } from './Cell';

export function checkWinState(grid: Cell[][]) {
  return grid.some((row) => row.some((cell) => cell.value === WIN_VALUE));
}
