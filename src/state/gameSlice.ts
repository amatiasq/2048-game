import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
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

const push = HAS_OBSTACLES ? pushCellsWithObstacles : pushCells;
const reversePush = (list: Cell[]) => push(list.reverse()).reverse();

export interface GameState {
  status: Status;
  grid: Cell[][];
}

const initialState: GameState = {
  status: 'READY',
  grid: array(ROWS, () => array(COLUMNS, emptyCell)),
};

export const gameSlice = createSlice({
  name: 'grid',

  initialState,

  reducers: {
    startGame(state, action: PayloadAction<number>) {
      state.status = 'PLAYING';
      state.grid = array(ROWS, () => array(COLUMNS, emptyCell));
      spawnRandomCell(state.grid, INITIAL_CELL_VALUE);

      const obstacles = action.payload ?? 0;

      for (let i = 0; i < obstacles; i++) {
        spawnRandomCell(state.grid, OBSTACLE);
      }
    },

    swipeUp(state) {
      const swiped = transpose(state.grid).map(push);
      state.grid = transpose(swiped);
      afterSwipe(state);
    },

    swipeDown(state) {
      const swiped = transpose(state.grid).map(reversePush);
      state.grid = transpose(swiped);
      afterSwipe(state);
    },

    swipeLeft(state) {
      state.grid = state.grid.map(push);
      afterSwipe(state);
    },

    swipeRight(state) {
      state.grid = state.grid.map(reversePush);
      afterSwipe(state);
    },
  },
});

export const { startGame, swipeUp, swipeDown, swipeLeft, swipeRight } =
  gameSlice.actions;

export default gameSlice.reducer;

function afterSwipe(state: GameState) {
  if (checkWinState(state.grid)) {
    state.status = 'WON';
    return;
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
