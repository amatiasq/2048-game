import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import './Grid.css';

export function Grid() {
  const grid = useSelector((state: RootState) => state.game.grid);
  const dispatch = useDispatch();

  return (
    <div class="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <div
            key={cell.id}
            class="cell"
            style={{ '--row': rowIndex, '--column': columnIndex }}
          >
            {cell.value}
          </div>
        ))
      )}
    </div>
  );
}
