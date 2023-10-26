import { Cell, OBSTACLE, emptyCell } from '../Cell';

export function pushCellsWithObstacles(list: Cell[]) {
  const result = [];

  let remaining = list;
  let obstacleIndex = remaining.findIndex((x) => x.value === OBSTACLE);

  while (obstacleIndex !== -1) {
    const obstacle = remaining[obstacleIndex];
    const chunk = remaining.slice(0, obstacleIndex);

    result.push(...pushCells(chunk), obstacle);

    remaining = remaining.slice(obstacleIndex + 1);
    obstacleIndex = remaining.findIndex((x) => x.value === OBSTACLE);
  }

  result.push(...pushCells(remaining));
  return result;
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
