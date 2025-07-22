import { useCallback, useRef, useEffect } from 'react';

// Debounce hook for search inputs and API calls
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<number | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  ) as T;
};

// Throttle hook for scroll events and frequent updates
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCall = useRef(0);
  const lastCallTimer = useRef<number | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      } else {
        if (lastCallTimer.current) {
          clearTimeout(lastCallTimer.current);
        }
        lastCallTimer.current = window.setTimeout(() => {
          callback(...args);
          lastCall.current = Date.now();
        }, delay - (now - lastCall.current));
      }
    },
    [callback, delay]
  ) as T;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return observerRef.current;
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (import.meta.env.DEV) {
      console.log(`${componentName} rendered ${renderCount.current} times in ${renderTime.toFixed(2)}ms`);
    }
    
    startTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
    resetRenderCount: () => {
      renderCount.current = 0;
    }
  };
};

// Memory leak prevention hook
export const useCleanup = (cleanupFn: () => void) => {
  useEffect(() => {
    return cleanupFn;
  }, [cleanupFn]);
};

// Optimized event listener hook
export const useEventListener = (
  eventName: string,
  handler: EventListener,
  element: EventTarget = window,
  options?: AddEventListenerOptions
) => {
  const savedHandler = useRef<EventListener | undefined>(undefined);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current?.(event);
    element.addEventListener(eventName, eventListener, options);
    return () => element.removeEventListener(eventName, eventListener, options);
  }, [eventName, element, options]);
};