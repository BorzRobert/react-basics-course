import { useState, useCallback } from 'react';

// Hook custom care ține o valoare și oferă metode pentru a o modifica.
// Fiecare APEL al useCounter() creează o instanță de stare independentă.
export function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);

  // useCallback memorizează funcția, o recalculează doar dacă [step] se schimbă.
  const increment = useCallback(() => {
    setCount(c => c + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(c => c - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);

  return { count, increment, decrement, reset };
}
