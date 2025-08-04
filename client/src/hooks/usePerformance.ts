import { useEffect, useRef, useState } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = (_componentName?: string) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    renderCount: 0
  });


  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    setRenderCount(prev => prev + 1);
    
    // Measure load time
    const loadTime = performance.now() - startTime;
    
    // Get memory usage if available
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
    
    setMetrics({
      loadTime,
      renderTime: loadTime,
      memoryUsage,
      renderCount
    });
  }, [renderCount]);

  const resetRenderCount = () => {
    setRenderCount(0);
  };

  return {
    ...metrics,
    renderCount,
    resetRenderCount
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [callback, options]);

  return targetRef;
};
