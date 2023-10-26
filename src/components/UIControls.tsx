import { useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { HAS_OBSTACLES } from '../config';
import { startGame } from '../state/gameSlice';
import { RootState } from '../state/store';
import { Timer } from './Timer';
import './UIControls.css';

export function UIControls() {
  const { status } = useSelector((state: RootState) => state.game);
  const [obstacles, setObstacles] = useState(0);

  const showObstaclesControl = HAS_OBSTACLES && status !== 'PLAYING';

  return (
    <>
      {showObstaclesControl ? (
        <ObstaclesSelector value={obstacles} onChange={setObstacles} />
      ) : null}
      <GameStateControls obstacles={obstacles} />
    </>
  );
}

// These components could go on their own file
// but they exist only to avoid UIControls component mixing semantics
// so I'd rather have them as private components
// keeping the global scope clean

function ObstaclesSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const buttons = [0, 1, 2, 3, 4].map((n) => (
    <button class={n === value ? 'active' : ''} onClick={() => onChange(n)}>
      {n}
    </button>
  ));

  return (
    <div class="obstacles-selector">
      <h4>Obstacles:</h4>
      {buttons}
    </div>
  );
}

function GameStateControls({ obstacles }: { obstacles: number }) {
  const [start, setStart] = useState(Date.now());
  const { status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  if (status === 'READY') {
    return <button onClick={restart}>Start</button>;
  }

  if (status === 'GAME_OVER') {
    return (
      <>
        <h2>Game Over</h2>
        <button onClick={restart}>Restart</button>
      </>
    );
  }

  if (status === 'WON') {
    return (
      <>
        <h2>You Won!</h2>
        <Timer start={start} stopped />
        <button onClick={restart}>Restart</button>
      </>
    );
  }

  return (
    <>
      <Timer start={start} />
      <button onClick={restart}>Restart</button>
    </>
  );

  function restart() {
    setStart(Date.now());
    dispatch(startGame(obstacles));
  }
}
