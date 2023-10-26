import { useEffect, useState } from 'preact/hooks';

export function Timer({ start }: { start: number }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - start);
    }, 1000);

    return () => {
      clearInterval(interval);
      setElapsed(0);
    };
  }, [start]);

  // end of hooks

  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed / 1000 / 60) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);
  const time = hours ? [hours, minutes, seconds] : [minutes, seconds];

  return <time>{time.map(formatTime).join(':')}</time>;
}

function formatTime(value: number) {
  return value.toString().padStart(2, '0');
}
