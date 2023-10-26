import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './Grid.css';

export function Grid() {
  const grid = useSelector((state: RootState) => state.game.grid);

  return (
    <div class="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <div
            key={cell.id}
            class="cell"
            data-value={cell.value}
            style={{ '--row': rowIndex, '--column': columnIndex }}
          >
            {cell.value || null}
          </div>
        ))
      )}
    </div>
  );
}
