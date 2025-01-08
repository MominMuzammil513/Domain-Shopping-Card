import { useState, useCallback } from 'react';
import { toaster } from './ui/toaster';

export const useUndoManager = (
  initialDomains: { domain: string; isAvailable: boolean }[]
) => {
  const [history, setHistory] = useState<
    { domain: string; isAvailable: boolean }[][]
  >([]);
  const [future, setFuture] = useState<
    { domain: string; isAvailable: boolean }[][]
  >([]);
  const [current, setCurrent] = useState(initialDomains);

  const save = useCallback(
    (newState: { domain: string; isAvailable: boolean }[]) => {
      setHistory((prev) => [...prev, current]);
      setFuture([]); // Clear future stack after a new action
      setCurrent(newState);
    },
    [current]
  );

  const undo = useCallback(() => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setFuture((prev) => [current, ...prev]); // Add current state to future stack
      setCurrent(previousState); // Set current state to the previous state
      setHistory((prev) => prev.slice(0, -1)); // Remove the last state from history
      toaster.create({ title: 'Undo Successful', type: 'success' });
    } else {
      toaster.create({ title: 'Nothing to Undo', type: 'info' });
    }
  }, [history, current]);

  const redo = useCallback(() => {
    if (future.length > 0) {
      const nextState = future[0];
      setHistory((prev) => [...prev, current]); // Add current state to history
      setCurrent(nextState); // Set current state to the next state
      setFuture((prev) => prev.slice(1)); // Remove the first state from future
      toaster.create({ title: 'Redo Successful', type: 'success' });
    } else {
      toaster.create({ title: 'Nothing to Redo', type: 'info' });
    }
  }, [future, current]);

  return {
    current,
    setCurrent: (newState: { domain: string; isAvailable: boolean }[]) =>
      save(newState),
    undo,
    redo,
    future,
  };
};
