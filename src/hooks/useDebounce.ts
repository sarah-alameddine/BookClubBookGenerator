import { useRef, useCallback } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number = 500
): ((...args: Parameters<T>) => void) => {

  // Persist timeout between renders
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {

      // Cancel old timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Create new timeout
      timeoutRef.current = setTimeout(() => {

        // Run original function after delay
        console.log('searching...');

        func(...args);

      }, wait);
    },
    [func, wait]
  );

  return debouncedFunction;
};