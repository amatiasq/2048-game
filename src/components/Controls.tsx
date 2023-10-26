import { useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../state/gameSlice';
import { RootState } from '../state/store';
import { Timer } from './Timer';

export function UIControls() {
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
    dispatch(startGame(2));
  }
}
