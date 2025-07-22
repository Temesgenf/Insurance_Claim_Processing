import { useEffect, useCallback, useRef } from 'react';

export const usePerformanceOptimization = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbackMap = useRef<WeakMap<Element, () => void>>(new WeakMap());

  // Intersection Observer for lazy loading
  const observeElement = useCallback((element: HTMLElement, callback: () => void) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
      // Store callback in WeakMap for later use when element becomes visible
      callbackMap.current.set(element, callback);
    }
  }, []);

  // Debounce function for search inputs
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Memoization helper
  const memoize = useCallback(<T extends (...args: any[]) => any>(fn: T) => {
    const cache = new Map();
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }, []);

  useEffect(() => {
    // Initialize Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            // Execute callback if stored
            const callback = callbackMap.current.get(entry.target);
            if (callback) {
              try {
                callback();
              } catch (error) {
                console.warn('Failed to execute intersection callback:', error);
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { observeElement, debounce, memoize };
};
