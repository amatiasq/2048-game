import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  ALLOW_CONTINUE_AFTER_WIN,
  COLUMNS,
  HAS_OBSTACLES,
  INITIAL_CELL_VALUE,
  ROWS,
  SWIPE_CELL_VALUE,
  WIN_VALUE,
} from '../config';
import { Cell, OBSTACLE, emptyCell } from '../util/Cell';
import { array, transpose } from '../util/array';
import { pushCells, pushCellsWithObstacles } from '../util/pushCells';
import { CellNotFoundError, spawnRandomCell } from '../util/spawnRandomCell';

// This may look weird, the value and the type have the same name
// I've an issue in Typescript repo to simplift this syntax
// https://github.com/microsoft/TypeScript/issues/48193
const Status = ['READY', 'PLAYING', 'WON', 'GAME_OVER'] as const;
type Status = (typeof Status)[number];

// State

export interface GameState {
  status: Status;
  grid: Cell[][];
}

export const useGameState = create(
  persist<GameState>(
    () => ({
      status: 'READY',
      grid: array(ROWS, () => array(COLUMNS, emptyCell)),
    }),
    {
      name: '2048-game',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Actions

const push = HAS_OBSTACLES ? pushCellsWithObstacles : pushCells;
const reversePush = (list: Cell[]) => push(list.reverse()).reverse();

export function startGame(obstacles = 0) {
  useGameState.setState(() => {
    const grid = array(ROWS, () => array(COLUMNS, emptyCell));
    spawnRandomCell(grid, INITIAL_CELL_VALUE);

    for (let i = 0; i < obstacles; i++) {
      // TODO: If the grid is too small or
      // we have too many obstacles this may throw CellNotFoundError
      spawnRandomCell(grid, OBSTACLE);
    }

    return {
      status: 'PLAYING',
      grid,
    };
  });
}

export function swipeLeft() {
  useGameState.setState(({ ...newState }) => {
    newState.grid = newState.grid.map(push);
    afterSwipe(newState);
    return newState;
  });
}

export function swipeRight() {
  useGameState.setState(({ ...newState }) => {
    newState.grid = newState.grid.map(reversePush);
    afterSwipe(newState);
    return newState;
  });
}

export function swipeUp() {
  useGameState.setState(({ ...newState }) => {
    const swiped = transpose(newState.grid).map(push);
    newState.grid = transpose(swiped);
    afterSwipe(newState);
    return newState;
  });
}

export function swipeDown() {
  useGameState.setState(({ ...newState }) => {
    const swiped = transpose(newState.grid).map(reversePush);
    newState.grid = transpose(swiped);
    afterSwipe(newState);
    return newState;
  });
}

// Internals

function afterSwipe(state: GameState) {
  if (checkWinState(state.grid)) {
    state.status = 'WON';

    if (!ALLOW_CONTINUE_AFTER_WIN) {
      return;
    }
  }

  try {
    spawnRandomCell(state.grid, SWIPE_CELL_VALUE);
  } catch (error) {
    if (error instanceof CellNotFoundError) {
      state.status = 'GAME_OVER';
    } else {
      throw error;
    }
  }
}

function checkWinState(grid: Cell[][]) {
  return grid.some((row) => row.some((cell) => cell.value === WIN_VALUE));
}
