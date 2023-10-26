import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cell, CellValue, createCell, emptyCell } from './Cell';
import { array, shuffle } from './util/array';

const COLUMNS = 6;
const ROWS = 6;
const INITIAL_CELL_VALUE: CellValue = 2;

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
      spawnRandomCellInternal(state, INITIAL_CELL_VALUE);
    },

    gameOver(state) {
      state.status = 'GAME_OVER';
    },

    spawnRandomCell(state, action: PayloadAction<CellValue>) {
      spawnRandomCellInternal(state, action.payload);
    },
  },
});

export const { startGame, gameOver, spawnRandomCell } = gameSlice.actions;

export default gameSlice.reducer;

// Internal utilites below

function spawnRandomCellInternal(state: GameState, value: CellValue) {
  const newCell = createCell(value);

  try {
    const { row, column } = findRandomCell(
      state.grid,
      (cell) => cell.value === 0
    );

    state.grid[row][column] = newCell;
    return true;
  } catch (error) {
    if (error instanceof CellNotFoundError) {
      gameSlice.caseReducers.gameOver(state);
      return false;
    }

    throw error;
  }
}

class CellNotFoundError extends Error {}

function findRandomCell(grid: Cell[][], condition: (cell: Cell) => boolean) {
  // Find a random row that matches the condition
  const randomRowIndex = shuffle(array(6)).find((rowIndex) =>
    grid[rowIndex].some(condition)
  );

  if (randomRowIndex == null) {
    throw new CellNotFoundError('No row to satisfy condition was found');
  }

  const row = grid[randomRowIndex];
  const randomColumnIndex = shuffle(array(6)).find((rowIndex) =>
    condition(row[rowIndex])
  );

  return {
    row: randomRowIndex,
    // we already know the row had a cell that matched the condition
    // so randomColumnIndex cannot be null
    column: randomColumnIndex!,
    cell: row[randomColumnIndex!],
  };
}
