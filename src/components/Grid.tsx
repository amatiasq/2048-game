import { useSelector } from 'react-redux';
import { OBSTACLE } from '../Cell';
import { COLUMNS, ROWS } from '../config';
import { RootState } from '../state/store';
import './Grid.css';

export function Grid() {
  const grid = useSelector((state: RootState) => state.game.grid);

  const cells = grid
    .flatMap((row, rowIndex) =>
      row.map((cell, columnIndex) => ({
        ...cell,
        row: rowIndex,
        col: columnIndex,
      }))
    )
    // I had to flatten and sort the cells so they always render on the same order
    // otherwise Preact destroys and re-generate them even if we use `key` prop
    // not sure what the issue was there, maybe it's an issue with Preact
    // switching to React may fix it but I'm unable to spend more time on this
    .sort((a, b) => a.id - b.id);

  return (
    <div class="grid" style={{ '--rows': ROWS, '--columns': COLUMNS }}>
      {cells.map((cell) => (
        <div
          key={cell.id}
          class="cell"
          data-value={cell.value}
          style={{ '--row': cell.row, '--column': cell.col }}
        >
          {cell.value === OBSTACLE ? null : cell.value || null}
        </div>
      ))}
    </div>
  );
}
