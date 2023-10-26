import { HAS_OBSTACLES } from './game-mechanics';

type CellId = number;

export const OBSTACLE = -1;
export type Obstacle = typeof OBSTACLE;

export type CellValue =
  | 0
  | 1
  | 2
  | 4
  | 8
  | 16
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048
  // a bit of type gymnastics
  // this ensures that Obstacle is a valid CellValue only if HAS_OBSTACLES is true
  | (typeof HAS_OBSTACLES extends true ? Obstacle : never);

// TODO: Use a UUID generator instead
let lastId = 0;

export interface Cell {
  readonly id: CellId;
  value: CellValue | Obstacle;
}

export function emptyCell() {
  return createCell(0);
}

export function createCell(value: CellValue): Cell {
  return {
    id: lastId++,
    value,
  };
}
