import { createSlice } from '@reduxjs/toolkit';
import { Cell, emptyCell } from './Cell';
import { array, transpose } from './util/array';
import {
  COLUMNS,
  CellNotFoundError,
  INITIAL_CELL_VALUE,
  ROWS,
  SWIPE_CELL_VALUE,
  pushCells,
  spawnRandomCell,
} from './util/game-mechanics';

// This may look weird, the value and the type have the same name
// I've an issue in Typescript repo to simplift this syntax
// https://github.com/microsoft/TypeScript/issues/48193
const Status = ['READY', 'PLAYING', 'GAME_OVER'] as const;
type Status = (typeof Status)[number];

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
    startGame(state) {
      state.status = 'PLAYING';
      state.grid = array(ROWS, () => array(COLUMNS, emptyCell));
      spawnRandomCell(state.grid, INITIAL_CELL_VALUE);
    },

    gameOver(state) {
      state.status = 'GAME_OVER';
    },

    swipeUp(state) {
      const swiped = transpose(state.grid).map(pushCells);
      state.grid = transpose(swiped);
      spawnCellAfterSwipe(state);
    },

    swipeDown(state) {
      const swiped = transpose(state.grid).map(reversePushCells);
      state.grid = transpose(swiped);
      spawnCellAfterSwipe(state);
    },

    swipeLeft(state) {
      state.grid = state.grid.map(pushCells);
      spawnCellAfterSwipe(state);
    },

    swipeRight(state) {
      state.grid = state.grid.map(reversePushCells);
      spawnCellAfterSwipe(state);
    },
  },
});

export const {
  startGame,
  gameOver,
  swipeUp,
  swipeDown,
  swipeLeft,
  swipeRight,
} = gameSlice.actions;

export default gameSlice.reducer;

function reversePushCells(list: Cell[]) {
  return pushCells(list.reverse()).reverse();
}

function spawnCellAfterSwipe(state: GameState) {
  try {
    spawnRandomCell(state.grid, SWIPE_CELL_VALUE);
  } catch (error) {
    if (error instanceof CellNotFoundError) {
      gameSlice.caseReducers.gameOver(state);
    } else {
      throw error;
    }
  }
}
