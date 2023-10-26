type CellId = number;

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
  | 2048;

// TODO: Use a UUID generator instead
let lastId = 0;

export interface Cell {
  id: CellId;
  value: CellValue;
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
