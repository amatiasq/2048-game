import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { swipeDown, swipeLeft, swipeRight, swipeUp } from '../store.game';

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

export function GameControls() {
  const { status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== 'PLAYING') {
      return;
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    function handleKeyDown(event: KeyboardEvent) {
      if (!KEYS[event.key]) {
        return;
      }

      event.preventDefault();
      dispatch(KEYS[event.key]());
    }
  }, [status, dispatch]);

  return null;
}
