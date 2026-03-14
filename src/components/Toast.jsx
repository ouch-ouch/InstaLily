import { useEffect, useRef } from 'react';

export default function Toast({ message, onDone }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!message) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onDone(), 2500);
    return () => clearTimeout(timerRef.current);
  }, [message, onDone]);

  return (
    <div
      id="toast"
      className={`toast${message ? ' show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
