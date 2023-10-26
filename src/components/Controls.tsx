import { useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { startGame } from '../store.game';
import { Timer } from './Timer';

export function Controls() {
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

  return (
    <>
      <Timer start={start} />
      <button onClick={restart}>Restart</button>
    </>
  );

  function restart() {
    setStart(Date.now());
    dispatch(startGame());
  }
}
