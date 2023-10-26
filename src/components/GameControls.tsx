import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { swipeDown, swipeLeft, swipeRight, swipeUp } from '../store.game';

export function GameControls() {
  const { status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== 'PLAYING') {
      return;
    }

    const unsubscribeKeyboard = whenKeyPressed(dispatch);
    const unsubscribeTouch = whenTouchSwipe(dispatch);

    return () => {
      unsubscribeKeyboard();
      unsubscribeTouch();
    };
  }, [status, dispatch]);

  // Nothing to render
  // maybe this could be a hook?
  return null;
}

function whenKeyPressed(dispatch: Dispatch<AnyAction>) {
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

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };

  function handleKeyDown(event: KeyboardEvent) {
    if (!KEYS[event.key]) return;
    event.preventDefault();
    dispatch(KEYS[event.key]());
  }
}

function whenTouchSwipe(dispatch: Dispatch<AnyAction>) {
  // Copied from this nice person
  // https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d?permalink_comment_id=3385647#gistcomment-3385647

  let startX = 0;
  let startY = 0;

  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);

  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  function handleTouchStart(event: TouchEvent) {
    startX = event.changedTouches[0].screenX;
    startY = event.changedTouches[0].screenY;
  }

  function handleTouchEnd(event: TouchEvent) {
    const diffX = event.changedTouches[0].screenX - startX;
    const diffY = event.changedTouches[0].screenY - startY;
    const ratioX = Math.abs(diffX / diffY);
    const ratioY = Math.abs(diffY / diffX);
    const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

    // Ignore small movements.
    if (absDiff < 30) return;

    if (ratioX > ratioY) {
      if (diffX >= 0) {
        console.log('right swipe');
        dispatch(swipeRight());
      } else {
        console.log('left swipe');
        dispatch(swipeLeft());
      }
    } else {
      if (diffY >= 0) {
        console.log('down swipe');
        dispatch(swipeDown());
      } else {
        console.log('up swipe');
        dispatch(swipeUp());
      }
    }
  }
}
