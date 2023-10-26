import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  startGame,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from '../store.game';
import { Timer } from './Timer';

// Record is necessary to use a string as a key
// but the return type of such functions is complex
// and () => void or () => unknown wouldn't be passable to dispatch
// so it's either using Function or () => any
const KEYS: Record<string, Function> = {
  ArrowUp: swipeUp,
  ArrowDown: swipeDown,
  ArrowLeft: swipeLeft,
  ArrowRight: swipeRight,
};

export function Controls() {
  const [start, setStart] = useState(Date.now());
  const { status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== 'PLAYING') return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

    function handleKeyDown(event: KeyboardEvent) {
      if (!KEYS[event.key]) return;
      event.preventDefault();
      dispatch(KEYS[event.key]());
    }
  }, [status, dispatch]);

  // end of hooks

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
